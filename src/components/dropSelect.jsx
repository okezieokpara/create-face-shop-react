import React from 'react';
import PropTypes from 'prop-types';
export class DropSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isExpanded: false, selectedIndex: this.props.defaultSelectedIndex};
    this.handleExpand = this.handleExpand.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setMyRef = this.setMyRef.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  handleClickOutside(evt) {
    if (this.myRef && !this.myRef.contains(evt.target)) {
      this.setState({isExpanded: false});
    }
  }
  handleExpand(evt) {
    evt.preventDefault();
    this.setState({isExpanded: !this.state.isExpanded});
  }
  handleItemClick(item, key, evt) {
    this.setState({selectedIndex: key, isExpanded: false});
    if (item.onSelect) {
      item.onSelect();
    }
    evt.preventDefault();
  }
  setMyRef(node) {
    this.myRef = node;
  }

  render() {
    return (
      <div className={`dropdown ${this.state.isExpanded ? 'show' : ''} mr-1`} ref={this.setMyRef}>
        <label>{this.props.label}: &nbsp;</label>
        <button className={`btn  ${this.props.buttonStyle ? this.props.buttonStyle : 'btn-outline-secondary'} dropdown-toggle`} onClick={this.handleExpand}>
          <span data-feather="calendar"/>
          {this.props.items[this.state.selectedIndex] ? this.props.items[this.state.selectedIndex].title : 'Select' }
        </button>
        <div className={`dropdown-menu ${this.state.isExpanded ? 'show' : ''}`}>
          {
            this.props.items.map((obj, key) => (
              <a className="dropdown-item" href="#" key={key} onClick={e => this.handleItemClick(obj, key, e)}>{obj.title}</a>)
            )
          }
        </div>
      </div>
    );
  }
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    defaultSelectedIndex: PropTypes.number,
    buttonStyle: PropTypes.string,
    label: PropTypes.string
  }
  static defaultProps = {
    items: [],
    defaultSelectedIndex: 0,
    label: 'Select'
  }
}
