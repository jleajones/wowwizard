var Theme = (function () {
    function Theme() {
        this._allowedColorSchemas = ['pomegranate', 'blueberry'];
        this._allowedStyleSchemas = ['material'];
        this._defaultColorSchema = 'pomegranate';
        this._defaultStyleSchema = 'material';
        this._styles = {};
        this._colors = {};
        this.selectColorSchema(this._defaultColorSchema);
        this.selectStyleSchema(this._defaultStyleSchema);
        this.addPredefinedColorAndStyles();
    }
    Theme.construct = function () {
        return Theme._instance;
    };
    Theme.prototype.setWizard = function (wizard) {
        this._wizard = wizard;
    };
    Theme.prototype.addColorSchema = function (name, schema) {
        this._colors[name] = schema;
    };
    Theme.prototype.addStyleSchema = function (name, schema) {
        this._styles[name] = schema;
    };
    Theme.prototype.selectColorSchema = function (name) {
        this._selectedColorSchema = this._colors[name];
    };
    Theme.prototype.selectStyleSchema = function (name) {
        this._selectedStyleSchema = this._styles[name];
    };
    Theme.prototype.getSelectedColorSchema = function () {
        return this._selectedColorSchema;
    };
    Theme.prototype.getSelectedStyleSchema = function () {
        return this._selectedStyleSchema;
    };
    Theme.prototype.apply = function (step_html) {
        var selectedColorSchema = this._wizard.settings.theme;
        var selectedStyleSchema = this._wizard.settings.style;
        if (selectedColorSchema) {
            if (this._allowedColorSchemas.indexOf(selectedColorSchema) === -1) {
                this._wizard.warning("Theme choice " + selectedColorSchema + " doesn't exist in the plugin.");
                this.selectColorSchema(this._defaultColorSchema);
            }
            else {
                this.selectColorSchema(selectedColorSchema);
            }
        }
        else {
            this._wizard.warning("You should specify a custom theme of your taste.");
            this.selectColorSchema(this._defaultColorSchema);
        }
        if (selectedStyleSchema) {
            if (this._allowedStyleSchemas.indexOf(selectedStyleSchema) === -1) {
                this._wizard.warning("Style choice " + selectedStyleSchema + " doesn't exist in the plugin.");
                this.selectStyleSchema(this._defaultStyleSchema);
            }
            else {
                this.selectStyleSchema(selectedStyleSchema);
            }
        }
        else {
            this._wizard.warning("You should specify a custom style of your taste.");
            this.selectStyleSchema(this._defaultStyleSchema);
        }
        var colorSchemaChoice = this.getSelectedColorSchema();
        var styleSchemaChoice = this.getSelectedStyleSchema();
        step_html.find(".wow-wizard-step-indicator.visited .step-id").css('background-color', colorSchemaChoice.circleColor);
        step_html.find(".wow-wizard-step-indicator").css('color', colorSchemaChoice.activeIndicatorTextColor);
        step_html.find(".wow-wizard-step-indicator.visited").css('background-color', colorSchemaChoice.activeIndicatorBackgroundColor);
        step_html.find(".wow-wizard-step-indicator").filter(function (index) {
            return !$(this).hasClass('visited');
        }).css('color', colorSchemaChoice.textColor);
        step_html.find('.wow-wizard-step-indicators').css('border-bottom', '2px solid ' + colorSchemaChoice.lineColor);
        step_html.find('#wow-wizard-next-step, .single-choice-button').css('background-color', colorSchemaChoice.activeButtonBackgroundColor);
        step_html.find('#wow-wizard-next-step, .single-choice-button').css('color', colorSchemaChoice.buttonTextColor);
        step_html.find('.multiple-image-choice .circle-select .background').css('background-color', colorSchemaChoice.imageChoiceCircleBackgroundColor);
        step_html.find('.multiple-image-choice, .multiple-image-choice .circle-select').css('border', '2px solid ' + colorSchemaChoice.imageChoiceBorderColor);
        step_html.find('.fancy-checkbox .button').css('background-color', colorSchemaChoice.passiveButtonBackgroundColor);
        step_html.find('.fancy-checkbox .button.active').css('background-color', colorSchemaChoice.activeButtonBackgroundColor);
        step_html.find('.multiple-image-choice .circle-select .background').css('background-color');
        step_html.find('.input-col-6 .star-icon').css('color', colorSchemaChoice.outlineColor);
        step_html.find('input[type=text], textarea').css('outline', 'none');
        step_html.find('input[type=text]:focus, textarea:focus').css({
            'border': '2px solid ' + colorSchemaChoice.outlineColor,
            'box-shadow': '0px 0px 5px 0px rgba(244,74,85,1);'
        });
        step_html.find('input[type=text], input[type=email], textarea').focus(function () {
            $(this).css({
                'border': '1px solid ' + colorSchemaChoice.outlineColor,
                '-webkit-box-shadow': '0px 0px 5px 0px ' + colorSchemaChoice.outlineColor,
                'box-shadow': '0px 0px 5px 0px ' + colorSchemaChoice.outlineColor
            });
        });
        step_html.find('input[type=text], input[type=email], textarea').blur(function () {
            $(this).css({
                'border': '1px solid #BBB',
                '-webkit-box-shadow': 'none'
            });
        });
        if (this._wizard.settings.style) {
            step_html.find('input, textarea, button, #wow-wizard-next-step, .multiple-image-choice, .single-choice-button, .wow-wizard-step-indicator, #wow-alert').css('border-radius', this.getSelectedStyleSchema().borderRadius);
        }
        step_html.find('.loader').css('background-image', "url('" + this._wizard.settings.loader + "')");
    };
    Theme.prototype.addPredefinedColorAndStyles = function () {
        var pomegranate = {
            activeIndicatorBackgroundColor: '#F44A56',
            activeIndicatorTextColor: '#FFF',
            questionAndAnswerTextColor: '#69181E',
            circleColor: '#C23640',
            outlineColor: '#F44A56',
            lineColor: '#F44A56',
            activeButtonBackgroundColor: '#F44A56',
            passiveButtonBackgroundColor: '#FFF',
            activeButtonTextColor: '#FFF',
            passiveButtonTextColor: '#000',
            buttonTextColor: '#FFF',
            imageChoiceBorderColor: "#F44A56",
            imageChoiceCircleBackgroundColor: "#FFB3B8",
            textColor: "#FFF"
        };
        this.addColorSchema('pomegranate', pomegranate);
        var blueberry = {
            activeIndicatorBackgroundColor: '#4068D6',
            activeIndicatorTextColor: '#FFF',
            questionAndAnswerTextColor: '#69181E',
            circleColor: '#204ABD',
            outlineColor: '#4068D6',
            lineColor: '#4068D6',
            activeButtonBackgroundColor: '#4068D6',
            passiveButtonBackgroundColor: '#FFF',
            activeButtonTextColor: '#FFF',
            passiveButtonTextColor: '#000',
            buttonTextColor: '#FFF',
            imageChoiceBorderColor: "#4068D6",
            imageChoiceCircleBackgroundColor: "#A2B5EB",
            textColor: "#FFF"
        };
        this.addColorSchema('blueberry', blueberry);
        var material = {
            borderRadius: "0.2px"
        };
        this.addStyleSchema('material', material);
    };
    Theme._instance = new Theme();
    return Theme;
}());
var CheckboxBeautifier = (function () {
    function CheckboxBeautifier(theme) {
        this._settings = {
            on: {
                icon: 'glyphicon glyphicon-check'
            },
            off: {
                icon: 'glyphicon glyphicon-unchecked'
            }
        };
        this._theme = theme;
    }
    CheckboxBeautifier.prototype.update = function () {
        this.sync();
    };
    CheckboxBeautifier.prototype.selectButton = function ($button) {
        this.sync();
        $button.triggerHandler('click');
    };
    CheckboxBeautifier.prototype._updateDisplay = function ($button, $checkbox) {
        var isChecked = $checkbox.is(':checked');
        if (isChecked) {
            $button.data('state', 'on');
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + this._settings.on.icon);
        }
        else {
            $button.data('state', 'off');
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + this._settings.off.icon);
        }
        if (isChecked) {
            $button
                .addClass('active')
                .css('background-color', this._theme.getSelectedColorSchema().activeButtonBackgroundColor)
                .css('color', this._theme.getSelectedColorSchema().activeButtonTextColor);
        }
        else {
            $button
                .removeClass('active')
                .css('background-color', this._theme.getSelectedColorSchema().passiveButtonBackgroundColor)
                .css('color', this._theme.getSelectedColorSchema().passiveButtonTextColor);
        }
    };
    CheckboxBeautifier.prototype.sync = function () {
        var _this = this;
        var self = this;
        $('.fancy-checkbox').each(function (index, value) {
            var $widget = $(value), $button = $widget.find('button'), $checkbox = $widget.find('input:checkbox'), color = $button.data('color');
            $button.unbind().on('click', function () {
                $checkbox.data('checked', !$checkbox.is(':checked'));
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                _this._updateDisplay($button, $checkbox);
            });
            $checkbox.on('change', function () {
                _this._updateDisplay($button, $checkbox);
            });
            _this._updateDisplay($button, $checkbox);
            var iconClass;
            if ($button.data('state') === 'on') {
                iconClass = _this._settings.on.icon;
            }
            else {
                iconClass = _this._settings.off.icon;
            }
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + iconClass + '"></i> ');
            }
        });
    };
    return CheckboxBeautifier;
}());
;
(function ($) {
    $.fn.wowWizard = function (options) {
        var defaultOptions = {
            steps: [],
            theme: 'pomegranate',
            loader: '../../img/loader.gif',
            errors: {
                form: {
                    required: "You have to fill in all required fields.",
                    email: "Wrong e-mail format."
                },
                multiple_choice: {
                    required: "You have to choose at least one of the choices.",
                },
                single_choice: {
                    required: "You have to fill in all required fields.",
                }
            },
            onNextStep: function () { },
            onPrevStep: function () { },
            onFinish: function (data) { },
        };
        $.fn.wowWizard.defaults = defaultOptions;
        var theme = Theme.construct();
        theme.setWizard(this);
        this.warning = function (message) {
            console.error("Warning: " + message);
        };
        var settings = $.extend({}, $.fn.wowWizard.defaults, options);
        settings.errors = $.extend({}, $.fn.wowWizard.defaults.errors, options.errors);
        this.settings = settings;
        var wizard = this;
        wizard.checkboxBeautifier = new CheckboxBeautifier(theme);
        console.log(this.settings);
        var CONFIG = (function () {
            var privateFields = {
                'shouldHaveNextButton': ['form', 'multiple_choice', 'multiple_image_choice', 'textarea'],
                'allowedStepTypes': ['single_choice', 'form', 'multiple_choice', 'multiple_image_choice', 'textarea']
            };
            return {
                shouldHaveNextButton: function ($step) {
                    return privateFields.shouldHaveNextButton.indexOf($step.type) != -1;
                },
                isStepTypeAllowed: function ($step) {
                    return privateFields.allowedStepTypes.indexOf($step.type) != -1;
                },
                debug: false
            };
        })();
        var currentStep = 0;
        var passedStepTracker = 0;
        _syncStep();
        function _syncStep() {
            var $step = wizard.settings.steps[currentStep];
            if ($step.isDependent) {
                $step = _getDependentStep($step);
            }
            if (!$step) {
                throw new Error("Wrong dependency accross the steps.");
            }
            else if (!CONFIG.isStepTypeAllowed($step)) {
                throw new Error("Step type is not allowed: " + $step.type);
            }
            else {
                var $step_html = _getStepHTML($step);
                wizard.html($step_html).find('.wow-wizard-content').css('opacity', '0');
                _prepareEventHandlers($step, $step_html);
                theme.apply($step_html);
                var loadingTime = $step.type == 'multiple_image_choice' ? 1000 : 300;
                setTimeout(function () {
                    wizard.find('.wow-wizard-content').animate({
                        opacity: 1
                    }, 500);
                    wizard.find('.loader').fadeOut(200);
                }, loadingTime);
                _reuseOldInput($step);
            }
            wizard.checkboxBeautifier.update();
        }
        function _getDependentStep($step) {
            for (var i = 0; i < $step.steps.length; i++) {
                var step_steps = $step.steps[i];
                var $trigger_step = wizard.settings.steps[step_steps.triggerStep];
                if ($trigger_step.given_answer == step_steps.triggerAnswer) {
                    return step_steps;
                }
            }
        }
        function _prepareEventHandlers($step, $step_html) {
            var $step_buttons = $step_html.find(".wow-wizard-step-indicator");
            $step_buttons.each(function (index) {
                var step_id = $(this).data("step");
                if (passedStepTracker > step_id) {
                    $(this).find(".step-id").html('<div class="check"></div>');
                }
                if (currentStep == step_id) {
                    $(this).addClass('visited');
                }
                $(this).click(function () {
                    _goToStep($(this));
                });
            });
            var $alert_area = $step_html.find("#wow-alert");
            $alert_area.fadeOut(0);
            var $next_step_button = $step_html.find("#wow-wizard-next-step");
            $next_step_button.click(function () {
                _nextStep();
            });
            $("div.single-choice-button").click(function () {
                $(this).data('selected', true);
                $(this).data('selected');
                _nextStep();
            });
            if ($step.type == 'form') {
                $(wizard).bind('keypress', function (e) {
                    var code = e.keyCode || e.which;
                    if (code == 13) {
                        _nextStep();
                    }
                });
            }
            if ($step.type == 'multiple_image_choice') {
                var $multiple_image_choices = wizard.find('.multiple-image-choice');
                $multiple_image_choices.each(function (index) {
                    var $multiple_image_choice = $(this);
                    $multiple_image_choice.data('isAvailable', true);
                    $multiple_image_choice.click(function () {
                        if ($multiple_image_choice.data('selected')) {
                            _unSelectElement('multiple_image_choice', $multiple_image_choice);
                        }
                        else {
                            _selectElement('multiple_image_choice', $multiple_image_choice);
                        }
                    });
                });
            }
        }
        function _nextStep() {
            var $step = wizard.settings.steps[currentStep];
            if ($step.isDependent) {
                $step = _getDependentStep($step);
            }
            if (!_recordStepData($step)) {
                return false;
            }
            if (++currentStep >= wizard.settings.steps.length) {
                currentStep--;
                _finalStep();
            }
            else {
                if (currentStep > passedStepTracker)
                    passedStepTracker++;
                _syncStep();
                wizard.settings.onNextStep();
            }
            return true;
        }
        function _recordStepData($step) {
            var alertMessage;
            switch ($step.type) {
                case 'single_choice':
                    wizard.find(".single-choice-button").each(function () {
                        if ($(this).data('selected')) {
                            answer = $(this).data('value');
                        }
                    });
                    $step.given_answer = answer;
                    if (CONFIG.debug)
                        console.log($step.given_answer);
                    return true;
                case 'multiple_choice':
                    var answers = [];
                    wizard.find(".multiple-choice-choice").each(function () {
                        if ($(this).hasClass('active')) {
                            answers.push($(this).data('value'));
                        }
                    });
                    if (answers.length == 0) {
                        console.log(wizard.settings.errors.multiple_choice);
                        alertMessage = $step.errors && $step.errors.required ? $step.errors.required : wizard.settings.errors.multiple_choice.required;
                        return _stepFailed($step, alertMessage);
                    }
                    $step.given_answer = answers;
                    if (CONFIG.debug)
                        console.log($step.given_answer);
                    return true;
                case 'form':
                    var inputs = wizard.find("input");
                    var answers = [];
                    var stepFailed = false;
                    inputs.each(function (index) {
                        if ($(this).val() != "") {
                            answers[index] = $(this).val();
                        }
                        else if ($(this).data('required')) {
                            stepFailed = true;
                            alertMessage = $step.errors && $step.errors.required ? $step.errors.required : wizard.settings.errors.form.required;
                            $(this).css('border-color', 'red');
                            return true;
                        }
                        if ($(this).attr('type') == 'email') {
                            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            if (!re.test($(this).val())) {
                                stepFailed = true;
                                $(this).css('border-color', 'red');
                                alertMessage = $step.errors && $step.errors.email ? $step.errors.email : wizard.settings.errors.form.email;
                            }
                            return true;
                        }
                    });
                    $step.given_answer = answers;
                    if (CONFIG.debug)
                        console.log($step.given_answer);
                    return stepFailed ? _stepFailed($step, alertMessage) : true;
                case 'multiple_image_choice':
                    var answers = [];
                    var $konut_tipi_choices = wizard.find(".multiple-image-choice");
                    $konut_tipi_choices.each(function () {
                        if ($(this).data('selected')) {
                            answers.push($(this).data('slug'));
                        }
                    });
                    if (answers.length != 0) {
                        $step.given_answer = answers;
                        if (CONFIG.debug)
                            console.log($step.given_answer);
                        return true;
                    }
                    else {
                        alertMessage = $step.errors && $step.errors.required ? $step.errors.required : wizard.settings.errors.multiple_image_choice.required;
                        return _stepFailed($step, alertMessage);
                    }
                case 'textarea':
                    var answer = $("textarea").val();
                    if (answer) {
                        $step.given_answer = answer;
                    }
                    else {
                        $step.given_answer = "";
                    }
                    if (CONFIG.debug)
                        console.log($step.given_answer);
                    return true;
            }
        }
        function _goToStep(stepIndicator) {
            var destinationStep = stepIndicator.data("step");
            if (destinationStep > passedStepTracker || currentStep == destinationStep) {
                return;
            }
            var $step = wizard.settings.steps[destinationStep];
            currentStep = destinationStep;
            _syncStep();
            wizard.settings.onPrevStep();
        }
        function _stepFailed($step, alertMessage) {
            var $alert_area = wizard.find("#wow-alert");
            $alert_area.html(alertMessage);
            $alert_area.fadeIn(300);
            setTimeout(function () {
                $alert_area.fadeOut(300);
            }, 1500);
            return false;
        }
        function _reuseOldInput($step) {
            if ($step.given_answer) {
                switch ($step.type) {
                    case 'single_choice':
                        $(".single-choice-button").each(function () {
                            if ($step.given_answer == $(this).data('value')) {
                                $(this).find('i').fadeIn(200);
                            }
                        });
                        break;
                    case 'multiple_choice':
                        $(".fancy-checkbox").each(function () {
                            var $button = $(this).find("button");
                            if ($step.given_answer.indexOf($button.data('value')) != -1) {
                                wizard.checkboxBeautifier.selectButton($button);
                            }
                        });
                        break;
                    case 'form':
                        $("input").each(function (index) {
                            if ($step.given_answer[index]) {
                                $(this).val($step.given_answer[index]);
                            }
                        });
                        break;
                    case 'multiple_image_choice':
                        var $konut_choices = wizard.find('.multiple-image-choice');
                        $konut_choices.each(function (index) {
                            if ($step.given_answer.indexOf($(this).data('slug')) != -1) {
                                var $temp = $(this);
                                $temp.data('isAvailable', true);
                                _selectElement('multiple_image_choice', $temp);
                            }
                        });
                        break;
                    case 'textarea':
                        wizard.find("textarea").val($step.given_answer);
                        break;
                }
            }
        }
        function _finalStep() {
            wizard.html(_renderLastStep());
            var data = {};
            $.each(wizard.settings.steps, function (k, step) {
                var answer = step.given_answer;
                var step_name = step.name;
                if (step.isDependent) {
                    for (var i = 0; i < step.steps.length; i++) {
                        var substep = step.steps[i];
                        if (substep.given_answer) {
                            answer = substep.given_answer;
                            step_name = substep.name;
                            break;
                        }
                    }
                    ;
                }
                data[step_name] = answer;
            });
            wizard.settings.onFinish(data);
        }
        function _getStepHTML($step) {
            var $parsed_step = $('<div class="wow-wizard-step" type="' + $step.type + '"></div>');
            var $q_and_a;
            if ($step.notes) {
                $q_and_a = $('<div class="col-xs-9 wow-wizard-content"></div>');
                var $notes = $('<div class="col-xs-3 wow-wizard-content"></div>');
                $notes.html($step.notes);
                $parsed_step.append($notes);
            }
            else {
                $q_and_a = $('<div class="col-xs-12 wow-wizard-content"></div>');
            }
            $parsed_step.append($('<div class="loader"></div>'));
            var $question = $('<div class="wow-wizard-step-question"></div>');
            $question.append($('<h2 class="wow-wizard-step-question-title">' + $step.questionTitle + '</h2>'));
            $step.questionDescription ? $question.append($('<p class="wow-wizard-step-question-description">' + $step.questionDescription + '</p>')) : null;
            var $answers = $('<div class="wow-wizard-step-answers"></div>');
            switch ($step.type) {
                case 'single_choice':
                    $.each($step.answers, function (k, v) {
                        $answers.append($('<div class="single-choice-button" data-name="' + $step.name + '" data-value="' + v.value + '"><i class="fa fa-check"></i>' + v.text + '</div>'));
                    });
                    break;
                case 'multiple_choice':
                    try {
                        var $multiple_choice_choices = $('<div class="multiple-choice-choices"></div>');
                        $.each($step.answers, function (k, v) {
                            var $button_checkbox = $('<span class="fancy-checkbox"></span>');
                            $button_checkbox.append($('<button type="button" data-value="' + v.value + '" class="button multiple-choice-choice" data-checked="false" style="margin-right:10px;" data-color="info">' + v.text + '</button>'));
                            $button_checkbox.append($('<input style="display:none;" type="checkbox" name="' + v.value + '">'));
                            $multiple_choice_choices.append($button_checkbox);
                        });
                        $answers.append($multiple_choice_choices);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    break;
                case 'form':
                    try {
                        var $inputRow = $('<div class="input-row"></div>');
                        for (var i = 0; i < $step.inputs.length; i++) {
                            var currInput = $step.inputs[i];
                            var $input = $('<input class="pull-left" name="' + currInput.name + '" type="' + currInput.type + '">');
                            currInput.placeholder ? $input.attr('placeholder', currInput.placeholder) : null;
                            var $inputCol6 = $('<div class="input-col-6"></div>');
                            $inputCol6.append($input);
                            if (currInput.required) {
                                $inputCol6.prepend($('<div class="star-icon">*</div>'));
                                $input.data('required', true);
                            }
                            $inputRow.append($inputCol6);
                        }
                        $answers.append($inputRow);
                    }
                    catch (err) {
                        throw new Error("Input array of a step type \"form\" cannot be empty.");
                    }
                    break;
                case 'multiple_image_choice':
                    try {
                        var $choices = $('<div class="multiple-image-choices"></div>');
                        for (var i = 0; i < $step.answers.length; i++) {
                            var choice_info = $step.answers[i];
                            var $choice = $('<div class="multiple-image-choice" data-slug="' + choice_info.value + '"></div>');
                            var $choice_image = $('<div class="multiple-image-container" style="background-image:url(\'' + choice_info.imageUrl + '\')"/>');
                            var $choice_text = $('<p>' + choice_info.text + '</p>');
                            var $circle_select = $('<div class="circle-select"><div class="background"></div><div class="inner-circle-icon"></div></div>');
                            $choice.append($choice_image);
                            $choice.append($choice_text);
                            $choice.append($circle_select);
                            $choices.append($choice);
                        }
                        $answers.append($choices);
                    }
                    catch (err) {
                        console.log(err.message);
                    }
                    break;
                case 'textarea':
                    $answers.append('<textarea name="' + $step.name + '"></textarea>');
                    break;
            }
            $q_and_a.append($question);
            $q_and_a.append($answers);
            if (CONFIG.shouldHaveNextButton($step)) {
                $q_and_a.append($('<div id="wow-wizard-next-step" class="pull-right">' + wizard.settings.nextButtonText + '</div>'));
            }
            $q_and_a.append($('<div id="wow-alert" style="display:none;"></div>'));
            var $step_indicators = $('<div class="wow-wizard-step-indicators col-xs-12"></div>');
            for (var i = 0; i < wizard.settings.steps.length; i++) {
                var $step_indicator = $('<div class="wow-wizard-step-indicator" data-step="' + (i) + '"><div class="step-id"><span>' + (i + 1) + '</span></div><b>' + wizard.settings.steps[i].indicatorName + '</b></div>');
                $step_indicators.append($step_indicator);
            }
            $parsed_step.prepend($q_and_a);
            $parsed_step.prepend($step_indicators);
            return $parsed_step;
        }
        function _renderLastStep() {
            var $parsed_step = $('<div class="wow-wizard-last-step"><h1>Thanks for using WowWizard!</h1><p>We\'ve got all your information. Will reach you soon.</p><a href="#">RETURN HOME</a></div>');
            return $parsed_step;
        }
        function _selectElement(type, $element) {
            if ($element.data('isAvailable')) {
                switch (type) {
                    case 'room_choice':
                        if (!$element.data('isCustom'))
                            $element.data('isAvailable', false);
                        $element.css('color', 'white');
                        $element.find("i").fadeIn(200, function () {
                            $element.data('isAvailable', true);
                            $element.data('selected', true);
                        });
                        $element.animate({
                            backgroundColor: '#59BAFF'
                        }, 200, null);
                        if ($element.data('isCustom')) {
                            var $inputs = $element.find("input");
                            $inputs.css('color', 'white');
                            $inputs.css('border-bottom', '1px solid white');
                        }
                        break;
                    case 'multiple_image_choice':
                        $element.find(".circle-select").addClass('selected');
                        $element.find(".circle-select .background").fadeIn(200);
                        $element.find(".circle-select .inner-circle-icon").fadeIn(200);
                        $element.data('selected', true);
                        break;
                }
            }
        }
        function _unSelectElement(type, $element) {
            if ($element.data('isAvailable')) {
                switch (type) {
                    case 'room_choice':
                        if (!$element.data('isCustom'))
                            $element.data('isAvailable', false);
                        $element.css('color', '#59BAFF');
                        $element.animate({
                            backgroundColor: 'transparent'
                        }, 200, null);
                        $element.find("i").fadeOut(200, function () {
                            $element.data('isAvailable', true);
                            $element.data('selected', false);
                        });
                        if ($element.data('isCustom')) {
                            $element.find("input").css('color', '#59BAFF');
                            $element.find("input").css('border-bottom', '1px solid #59BAFF');
                        }
                        break;
                    case 'multiple_image_choice':
                        $element.find(".circle-select").removeClass('selected');
                        $element.find(".circle-select .background").fadeOut(200);
                        $element.find(".circle-select .inner-circle-icon").fadeOut(200);
                        $element.data('selected', false);
                        break;
                }
            }
        }
        wizard.update = function () {
            _syncStep();
        };
        return wizard;
    };
})(jQuery);
//# sourceMappingURL=wow.js.map