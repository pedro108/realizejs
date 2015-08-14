var Input = React.createClass({
  mixins: [CssClassMixin],
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    formStyle: React.PropTypes.string,
    errors: React.PropTypes.object,
    resource: React.PropTypes.string,
    component: React.PropTypes.string,
    componentMapping: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      value: null,
      component: 'text',
      formStyle: 'default',
      errors: {},
      resource: null,
      componentMapping: function(component) {
        var mapping = {
          text: InputText,
          autocomplete: InputAutocomplete,
          checkbox: InputCheckbox,
          datepicker: InputDatepicker,
          hidden: InputHidden,
          password: InputPassword,
          select: InputSelect,
          textarea: InputTextarea,
          checkbox_group: InputCheckboxGroup,
          radio_group: InputRadioGroup
        }; 

        return mapping[component];
      }
    };
  },

  getInitialState: function() {
    return {
      value: this.props.value,
      themeClassKey: this.themeClassKeyByStyle()
    };
  },

  themeClassKeyByStyle: function() {
    return 'input.wrapper.' + this.props.formStyle;
  },

  render: function() {
    var renderFunction = 'render' + S(this.props.component).capitalize().s + 'Input';
    if(this.hasOwnProperty(renderFunction)) {
      return this[renderFunction]();
    } else {
      return this.renderInput();
    }
  },

  renderInput: function() {
    return (
      <div className={this.className()}>
        {this.renderComponentInput()}
        {this.renderLabel()}
        {this.renderInputErrors()}
      </div>
    );
  },

  renderAutocompleteInput: function() {
    return (
      <div className={this.className()}>
        {this.renderComponentInput()}
        {this.renderInputErrors()}
      </div>
    );
  },

  renderDatepickerInput: function() {
    return (
      <div className={this.className()}>
        {this.renderComponentInput()}
        {this.renderInputErrors()}
      </div>
    );
  },

  renderHiddenInput: function() {
    return this.renderComponentInput();
  },

  renderComponentInput: function() {
    var componentInputClass = this.props.componentMapping(this.props.component);
    var componentInputProps = React.__spread({}, this.propsWithoutCSS(), {
      id: this.getInputComponentId(),
      name: this.getInputComponentName(),
      errors: this.getInputErrors(),
      ref: "inputComponent"
    });

    return React.createElement(componentInputClass, componentInputProps);
  },

  renderLabel: function() {
    return (
      <Label {...this.propsWithoutCSS()} id={this.getInputComponentId()} />
    );
  },

  renderInputErrors: function() {
    return (<InputError errors={this.getInputErrors()} />);
  },

  getInputComponentId: function() {
    var inputId = this.props.id;
    if(this.props.resource !== null) {
      inputId = this.props.resource + '_' + inputId;
    }

    return inputId;
  },

  getInputComponentName: function() {
    var inputName = (this.props.name || this.props.id);
    if(this.props.resource !== null) {
      inputName = this.props.resource + '[' + inputName + ']';
    }

    return inputName;
  },

  getInputErrors: function() {
    return this.props.errors[this.props.id];
  }
});
