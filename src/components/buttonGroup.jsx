import React from 'react';
import PropTypes from 'prop-types';
export class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedIndex: this.props.defaultSelectedIndex};
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
  }
  handleOptionSelect(item, key, evt) {
    this.setState({selectedIndex: key});
    evt.preventDefault();
    if (item.onSelect) {
      item.onSelect();
    }
  }
  render() {
    return (
      <div className="btn-group mr-2">
        {
          this.props.options.map((obj, key) => (
            <button className={`btn btn-sm btn-outline-secondary ${this.state.selectedIndex === key ? 'active' : ''} ${obj.isDisabled ? 'disabled' : ''}`} key={key} onClick={e => this.handleOptionSelect(obj, key, e)}>{obj.title}</button>

          ))
        }

      </div>
    );
  }
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    defaultSelectedIndex: PropTypes.number
  }
  static defaultProps = {
    options: [],
    defaultSelectedIndex: 0
  }
}
