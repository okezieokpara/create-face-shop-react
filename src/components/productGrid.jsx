import React from 'react';
import PropTypes from 'prop-types';
export class ProductGrid extends React.Component {
  getTime(time) {
    const getDateInterval = (past, future) => {
      const totalDailyMiliseconds = 1000 * 60 * 60 * 24;
      const pastMs = past.getTime();
      const futureMs = future.getTime();
      const dateDiffMs = futureMs - pastMs;
      return Math.round(dateDiffMs / totalDailyMiliseconds);
    };

    const result = new Date(time);
    const daysDiff = getDateInterval(result, new Date());
    if (daysDiff < 7) {
      if (daysDiff === 1) {
        return `a ${daysDiff} day ago`;
      }
      return `${daysDiff} days ago`;
    }
    return `${result.toDateString()} ${result.toLocaleTimeString()}`;
  }

  render() {
    return (

      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <p className="card-text" style={{fontSize: `${this.props.size}px`}}>{this.props.face}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p>${(parseFloat(Math.round(this.props.price * 100) / 100).toFixed(2)) / 100}</p>
            <small className="text-muted">{this.getTime(this.props.date)}</small>
          </div>
        </div>
      </div>
    );
  }
  static propTypes = {
    price: PropTypes.number.isRequired,
    face: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }
}
