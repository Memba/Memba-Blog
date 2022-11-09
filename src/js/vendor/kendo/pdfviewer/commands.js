/**
 * Kendo UI v2022.3.1109 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../kendo.upload.js";

(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        parseJSON = JSON.parse,
        progress = kendo.ui.progress,
        Class = kendo.Class,
        OPEN = "open",
        ZOOMSTART = "zoomStart",
        ZOOMEND = "zoomEnd";

    var Command = Class.extend({
        init: function(options) {
            this.options = options;
            this.viewer = options.viewer;
            this.errorMessages = this.viewer.options.messages.errorMessages;
        }
    });

    var OpenCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this.upload = this.viewer.processor.upload;
        },
        exec: function() {
            (this.viewer._upload || this._initUpload()).element.click();
        },
        _initUpload: function() {
            var uploadOptions = {
                select: this._onSelect.bind(this),
                success: this._onSuccess.bind(this),
                error: this._onError.bind(this),
                complete: this._onComplete.bind(this),
                showFileList: false,
                multiple: false,
                validation: {
                    allowedExtensions: [".pdf"]
                }
            };

            if (this.upload) {
                extend(uploadOptions, {
                    async: {
                        saveUrl: this.upload.url,
                        autoUpload: true,
                        saveField: this.upload.saveField
                    }
                });
            }

            var upload = $('<input name="files" accept=".pdf" type="file" />').kendoUpload(uploadOptions).getKendoUpload();
            this.viewer._upload = upload;

            return upload;
        },
        _onComplete: function() {
            progress(this.viewer.pageContainer, false);
        },
        _onSuccess: function(e) {
            var json = parseJSON(e.response);

            if ($.isPlainObject(json)) {
                this.viewer.processor.fromJSON(json);
            }
            else {
                this.viewer._triggerError({
                    error: json,
                    message: this.errorMessages.parseError
                });
            }
        },
        _onError: function(e) {
            this.viewer._triggerError({
                error: e.XMLHttpRequest.responseText,
                message: this.errorMessages.notSupported
            });
        },
        _onSelect: function(e) {
            var that = this;
            var fileToUpload = e.files[0];

            progress(that.viewer.pageContainer, true);

            if (that.viewer.trigger(OPEN, { file: fileToUpload }) || that.upload) {
                return;
            } else if (fileToUpload.extension.toLowerCase() !== ".pdf") {
                that.viewer._triggerError({
                    error: fileToUpload,
                    message: that.errorMessages.notSupported
                });
                return;
            }

            var reader = new FileReader();
            reader.onload = function(e) {
                var document = e.target.result;
                that.viewer.fromFile(document);
            };
            reader.onerror = function() {
                that.viewer._triggerError({
                    error: fileToUpload,
                    message: that.errorMessages.parseError
                });
            };

            reader.readAsArrayBuffer(fileToUpload.rawFile);
        }
    });

    var PageChangeCommand = Command.extend({
        exec: function() {
            var pageNumber = this.options.value;

            this.viewer.activatePage(pageNumber);
        }
    });

    var DownloadCommand = Command.extend({
        exec: function() {
            if (!this.viewer.document) {
                this.viewer._triggerError({
                    message: this.errorMessages.notFound
                });
                return;
            }

            var fileName = (this.viewer.document.info && this.viewer.document.info.title) ||
                            this.viewer.options.messages.defaultFileName;

            this.viewer.processor.downloadFile(fileName);
        }
    });

    var ExportCommand = Command.extend({
        init: function(options) {
            options = $.extend(options, this.options);
            Command.fn.init.call(this, options);
        },
        exec: function() {
            var dialog = (this.viewer._saveDialog || this._initDialog());

            dialog._updateModel({
                pagesCount: (this.viewer.document && this.viewer.document.total) || 1,
                page: this.viewer.options.page
            });

            dialog.open();
        },
        apply: function(viewModel) {
            var extension = viewModel.extension;

            if (extension === ".png") {
                this.viewer.exportImage(viewModel);
            } else if (extension === ".svg") {
                this.viewer.exportSVG(viewModel);
            }
        },
        _initDialog: function() {
            this.viewer._saveDialog = new kendo.pdfviewer.dialogs.ExportAsDialog({
                apply: this.apply.bind(this),
                pagesCount: (this.viewer.document && this.viewer.document.total) || 1,
                messages: this.viewer.options.messages
            });
            return this.viewer._saveDialog;
        }
    });

    var EnableSelectionCommand = Command.extend({
        exec: function() {
            var that = this,
                viewer = that.viewer;

                viewer._toggleSelection(true);
        }
    });

    var EnablePanCommand = Command.extend({
        exec: function() {
            var that = this,
                viewer = that.viewer;

                viewer._toggleSelection(false);
        }
    });

    var OpenSearchCommand = Command.extend({
        init: function(options) {
            var that = this;

            that.viewer = options.viewer;

            if (!that.viewer.searchDialog) {
                that.viewer.searchDialog = new kendo.pdfviewer.dialogs.SearchDialog({
                    position: {
                        top: that.viewer.pageContainer.offset().top,
                        left: that.viewer.pageContainer.offset().left
                    },
                    messages: that.viewer.options.messages.dialogs.search,
                    open: that._open.bind(that),
                    next: that._next.bind(that),
                    prev: that._prev.bind(that),
                    close: that._close.bind(that)
                });
            }

            Command.fn.init.call(that, options);
        },
        exec: function() {
            var that = this;

            that.viewer.searchDialog.open();
        },
        _open: function() {
            var that = this;

            that.changeHandler = that._change.bind(that);
            that.zoomStartHandler = that._closeDialog.bind(that);
            that.openFileHandler = that._closeDialog.bind(that);

            if (!that.viewer._searchDOM) {
                that.viewer._initSearchDOM();
                that.viewer.searchDialog.searchModel.bind("change", that.changeHandler);
                that.viewer.bind("zoomStart", that.zoomStartHandler);
                that.viewer.bind("open", that.openFileHandler);
            }
        },
        _close: function() {
            var that = this;
            var searchEngine = that.viewer._searchDOM;

            that.viewer.searchDialog.searchModel.unbind("change", that.changeHandler);
            that.viewer.unbind("zoomStart", that.zoomStartHandler);
            that.viewer.unbind("open", that.openFileHandler);
            searchEngine.destroy();
            delete that.viewer._searchDOM;
            that._updateSearchModel();
        },
        _change: function(ev) {
            var that = this;
            var searchEngine = that.viewer._searchDOM;
            var field = ev.field;
            var model = that.viewer.searchDialog.searchModel;
            var value = model[field];

            if (!searchEngine) {
                return;
            }

            switch (field) {
                case "searchText":
                    searchEngine.search(value, model.matchCase);
                    that._updateSearchModel();
                    break;
                case "matchCase":
                    searchEngine.search(model.searchText, value);
                    that._updateSearchModel();
                    break;
                default:
                    break;
            }
        },
        _next: function() {
            var that = this;
            var searchEngine = that.viewer._searchDOM;

            if (searchEngine.matches && searchEngine.matches.length) {
                searchEngine.nextMatch();
                that._updateSearchModel();
            }
        },
        _prev: function() {
            var that = this;
            var searchEngine = that.viewer._searchDOM;

            if (searchEngine.matches && searchEngine.matches.length) {
                searchEngine.previousMatch();
                that._updateSearchModel();
            }
        },
        _updateSearchModel: function() {
            var that = this;
            var searchEngine = that.viewer._searchDOM;
            var model = that.viewer.searchDialog.searchModel;

            if (searchEngine) {
                model.set("matches", searchEngine.matches.length);
                model.set("matchIndex", searchEngine.getMarkedIndex());
                that._scrollToMark();
            } else {
                model.set("searchText", "");
                model.set("matches", 0);
                model.set("matchIndex", 0);
                model.set("matchCase", false);
            }
        },
        _scrollToMark: function() {
            var that = this;
            var searchEngine = that.viewer._searchDOM;
            var marked = searchEngine.getFirstMarked();
            var scroller = that.viewer._scroller;
            var position;

            if (!marked.length) {
                return;
            }

            position = marked.offset().top - scroller.scrollElement.offset().top - 100;

            scroller.scrollTo(scroller.scrollLeft, position * -1);
        },
        _closeDialog: function() {
            var that = this;
            that.viewer.searchDialog.dialog.close();
        }
    });

    var ZoomCommand = Command.extend({
        exec: function() {
            var that = this,
                options = that.options,
                viewer = that.viewer,
                scale = options.scale,
                loadedPagesHeight = 0,
                page = that.viewer._pageNum,
                containerHeight = viewer.pageContainer[0].clientHeight,
                updatedVisiblePagesCount = 1,
                renderTasks = [];

            if (viewer.processingLib === "dpl") {
                return;
            }

            scale = that._calculateZoom();

            var updateViewer = function() {
                var scroller = that.viewer._scroller,
                    scrollingStarted = viewer._scrollingStarted;

                if (scroller && scroller.scrollTop > scroller.scrollHeight()) {
                    scroller._resize();
                }

                if (!scrollingStarted)
                {
                    viewer.activatePage(page);
                    viewer._scrollingStarted = false;
                }
            };

            if (!scale) {
                return;
            }

            viewer.zoomScale = scale;
            viewer._scrollingStarted = false;

            if (viewer.pages) {
                viewer.pages.forEach(function(page) {
                    var pageHeight;

                    if (viewer._visiblePages.indexOf(page) !== -1 && page.loaded) {
                        renderTasks.push(page.render(scale));

                        pageHeight = page._page.getViewport({
                            scale: scale
                        }).height;
                    }
                    else {
                        page.resize(scale);
                        pageHeight = page.element.height();
                    }

                    loadedPagesHeight += pageHeight;

                    if (loadedPagesHeight <= containerHeight) {
                        updatedVisiblePagesCount++;
                    }
                });


                if (viewer._visiblePagesCount != updatedVisiblePagesCount) {

                    viewer._visiblePagesCount = updatedVisiblePagesCount;
                    viewer._loadVisiblePages();
                }
            }

            Promise.all(renderTasks).then(function() {
                updateViewer();
                that._triggerZoomEnd(scale);
            }).catch(function() {
                updateViewer();
                that._triggerZoomEnd(scale);
            });
        },

        _calculateZoom: function() {
            var options = this.options,
                viewer = this.viewer,
                viewerOptions = viewer.options,
                pageContainer = viewer.pageContainer,
                visibleCanvas = viewer._visiblePages && viewer._visiblePages[0].canvas,
                calculatedDpr = (viewer._visiblePages && viewer._visiblePages[0]._dpr) || 2,
                scale = options.scale,
                scaleValue = scale,
                preventZoom;

            viewer._allowResize = false;
            viewer._autoFit = false;

            if (options.zoomIn) {
                scaleValue = scale = viewer.zoomScale + viewerOptions.zoomRate;
            } else if (options.zoomOut) {
                scaleValue = scale = viewer.zoomScale - viewerOptions.zoomRate;
            } else if (scale === "auto") {
                viewer._allowResize = true;
                scaleValue = viewer._autoZoomScale;
            } else if (scale === "actual") {
                scaleValue = 1;
            } else if (scale === "fitToWidth") {
                viewer._allowResize = true;
                viewer._autoFit = "fitToWidth";
                scaleValue = (pageContainer.width() / ((visibleCanvas.width / calculatedDpr) / viewer.zoomScale));
            } else if (scale === "fitToPage") {
                viewer._allowResize = true;
                viewer._autoFit = "fitToPage";
                scaleValue = (pageContainer.height() / ((visibleCanvas.height / calculatedDpr) / viewer.zoomScale));
            }

            preventZoom = scale < viewerOptions.zoomMin || scale > viewerOptions.zoomMax;

            if (preventZoom || viewer.trigger(ZOOMSTART, { scale: scale })) {
                return;
            }

            if (options.updateComboBox && viewer.toolbar)
            {
                viewer.toolbar._updateZoomComboBox(scale);
            }

            return scaleValue;
        },

        _triggerZoomEnd: function(scale) {
            var that = this,
                viewer = that.viewer;

            viewer.trigger(ZOOMEND, { scale: scale });
        }
    });

    var PrintCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
        },
        exec: function() {
            var that = this;

             if (!that.viewer.document) {
                that.viewer._triggerError({
                    message: this.errorMessages.notFound
                });
                return;
            }

            progress(that.viewer.pageContainer, true);
            that._renderPrintContainer();
            that._loadAllPages().then(that.processAfterRender.bind(that));
        },
        _renderPrintContainer: function() {
            this.printContainer = $("<div></div>");
        },
        _loadAllPages: function() {
            var that = this;
            var pages = that.viewer.pages;
            var loadPromises = [];
            var renderPromises = [];
            var promise = $.Deferred();

            that._originalScale = that.viewer.zoom();

            function getRenderPromise(page) {
                renderPromises.push(page._renderPromise);
            }

            for (var i = 0; i < pages.length; i++) {
                loadPromises.push(pages[i].load(3, true).then(getRenderPromise));
            }

            Promise.all(loadPromises).then(function() {
                promise.resolve(renderPromises);
            });

            return promise;
        },
        processAfterRender: function(renderPromises) {
            var that = this;

            Promise.all(renderPromises).then(function() {
                that._renderPrintPages();
                setTimeout(function() {
                    that._printDocument();
                    that.viewer.zoom(that._originalScale);
                    progress(that.viewer.pageContainer, false);
                    delete that._originalScale;
                }, 0);
            });
        },
        _renderPrintPages: function() {
            var pages = this.viewer.pages;

            for (var i = 0; i < pages.length; i++) {
                this._renderPrintImage(pages[i]);
            }
         },
        _renderPrintImage: function(page) {
            var canvas = page.canvas;
            var div = $("<div></div>");

            var img = "<img src='" + canvas.toDataURL() + "' width='" + page.width + "px' height='" + page.height + "px' />";

            div.append(img);

            this.printContainer.append(div);
        },
        _printDocument: function() {
            var that = this;
            var pages = that.viewer.pages;
            var width = pages[0].width;
            var height = pages[0].height;
            var myWindow = window.open('','','innerWidth=' + width + ',innerHeight=' + height + 'location=no,titlebar=no,toolbar=no');
            var browser = kendo.support.browser;

            if (!myWindow) {
                that.viewer._triggerError({
                    message: that.errorMessages.popupBlocked
                });
                return;
            }

            myWindow.document.write(that.printContainer.html());
            myWindow.document.close();
            myWindow.focus();
            myWindow.print();

            if (!browser.chrome || browser.chromiumEdge) {
                myWindow.close();
            } else {
                $(myWindow.document).find("body").on("mousemove", function() {
                    myWindow.close();
                });
            }
        }
    });

    extend(kendo.pdfviewer, {
        OpenCommand: OpenCommand,
        PageChangeCommand: PageChangeCommand,
        DownloadCommand: DownloadCommand,
        EnableSelectionCommand: EnableSelectionCommand,
        EnablePanCommand: EnablePanCommand,
        ExportCommand: ExportCommand,
        PrintCommand: PrintCommand,
        OpenSearchCommand: OpenSearchCommand,
        ZoomCommand: ZoomCommand
    });

})(window.kendo.jQuery);

