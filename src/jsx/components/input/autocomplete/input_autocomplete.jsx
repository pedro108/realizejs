var InputAutocomplete = React.createClass({
  mixins: [
    CssClassMixin,
    InputComponentMixin,
    SelectComponentMixin
  ],

  propTypes: {
    maxOptions: React.PropTypes.number,
    maxOptionsParam: React.PropTypes.string,
    searchParam: React.PropTypes.string,
    multiple: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      maxOptions: 99,
      maxOptionsParam: 'limit',
      searchParam: 'query',
      themeClassKey: 'input.autocomplete',
      multiple: false
    };
  },

  getInitialState: function() {
    return {
      selectedOptions: []
    };
  },

  componentWillMount: function() {
    this.state.loadParams[this.props.maxOptionsParam] = this.props.maxOptions;
  },

  componentDidMount: function() {
    $(document).on('click', this.handleDocumentClick);
  },

  componentWillUnmount: function() {
    $(document).off('click', this.handleDocumentClick);
  },

  render: function() {
    return (
      <div className={this.className()} ref="container">
        <InputAutocompleteSelect
          {...this.propsWithoutCSS()}
          selectedOptions={this.state.selectedOptions}
          onFocus={this.displayResult}
        />

        <InputAutocompleteResult
          id={this.props.id}
          selectedOptions={this.state.selectedOptions}
          options={this.state.options}
          onKeyDown={this.handleSearchNavigation}
          onKeyUp={this.searchOptions}
          onSelect={this.handleSelect}
          onClear={this.clearSelection}
          ref="result"
        />

        <InputAutocompleteValues
          id={this.props.id}
          name={this.props.name}
          multiple={this.props.multiple}
          selectedOptions={this.state.selectedOptions}
        />
      </div>
    );
  },

  handleDocumentClick: function(event) {
    var $resultNode = $(React.findDOMNode(this.refs.result));
    var $containerNode = $(React.findDOMNode(this.refs.container));
    var searchInput = $resultNode.find('input[type=text]')[0];

    if($containerNode.find(event.target).length === 0) {
      $resultNode.hide();
    } else {
      searchInput.focus();
    }
  },

  displayResult: function() {
    var $resultNode = $(React.findDOMNode(this.refs.result));
    var searchInput = $resultNode.find('input[type=text]')[0];

    $resultNode.show();
    searchInput.focus();
  },

  searchOptions: function(event) {
    var $searchInput = $(event.currentTarget);

    this.state.loadParams[this.props.searchParam] = $searchInput.val();
    this.loadOptions();
  },

  handleSearchNavigation: function(event) {
    var keyCode = event.keyCode;


  },

  clearSelection: function() {
    this.setState({
      selectedOptions: []
    });
  },

  handleSelect: function(option) {
    if(this.props.multiple) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  },

  handleMultipleSelect: function(option) {
    var optionIndex = this.selectedOptionIndex(option);

    if(optionIndex < 0) {
      this.state.selectedOptions.push(option);
    } else {
      this.state.selectedOptions.splice(optionIndex, 1);
    }

    this.forceUpdate();
  },

  handleSingleSelect: function(option) {
    var optionIndex = this.selectedOptionIndex(option);
    var newSelectedOptions = [];

    if(optionIndex < 0) {
      newSelectedOptions.push(option);
    }

    this.setState({
      selectedOptions: newSelectedOptions
    });
  },

  selectedOptionIndex: function(option) {
    var optionValues = $.map(this.state.selectedOptions, function(option) {
      return option.value;
    });

    return optionValues.indexOf(option.value);
  }

});
