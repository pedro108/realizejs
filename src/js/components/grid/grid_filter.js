var GridFilter = React.createClass({displayName: "GridFilter",
  propTypes: {
    form: React.PropTypes.object,
    url: React.PropTypes.string,
    method: React.PropTypes.string,
    submitButton: React.PropTypes.object,
    clearButton: React.PropTypes.object,
    onSuccess: React.PropTypes.func,
    onError: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      form: {

      },
      method: "GET",
      submitButton: {
        name: 'Filtrar',
        icon: 'search'
      },
      clearButton: {
        name: 'Limpar',
        className: 'filter__button--clear grey lighten-4'
      },
      onSuccess: function(data) {
        return true;
      },
      onError: function(xhr, status, error) {
        return true;
      },
      onSubmit: function(event) {
        return true;
      }
    };
  },

  render: function() {
    return(
      React.createElement(Form, React.__spread({},  this.props.form, 
        {action: this.props.url, 
        method: this.props.method, 
        onSuccess: this.props.onSuccess, 
        onError: this.props.onError, 
        onSubmit: this.props.onSubmit, 
        ref: "form"}), 

        this.props.children, 

        React.createElement("div", {className: "filter__button-group col s12 m12 l12 right-align"}, 
          React.createElement(Button, React.__spread({},  this.props.clearButton, {onClick: this.resetFilter})), 
          React.createElement(Button, React.__spread({},  this.props.submitButton, {type: "submit"}))
        )
      )
    );
  },

  serialize: function() {
    return this.refs.form.serialize();
  },

  resetFilter: function(event) {
    var formNode = React.findDOMNode(this.refs.form);
    formNode.reset();
  }

});
