import React from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';

const _logger = debug.extend('NewsletterCard');
// not completed page -- told to submit a pull request.
function NewsletterCard(props) {
    _logger(props);

    return (
        <div className="card">
            <img src={props.letter.coverPhoto} className="card-img-top" alt="coverPhoto" />
            <div className="card-body">
                <h5 className="card-title">{props.letter.name}</h5>
                <a href={props.letter.link} className="btn btn-primary">
                    Read Full Story
                </a>
                <p className="card-text">
                    <small className="text-muted">Published: {props.letter.dateToPublish}</small>
                </p>
            </div>
        </div>
    );
}

NewsletterCard.propTypes = {
    letter: PropTypes.shape({
        coverPhoto: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }),
};

export default NewsletterCard;
