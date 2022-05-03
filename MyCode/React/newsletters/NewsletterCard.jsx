import React, { useState } from 'react';
import './body.css';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import NewsletterFormUpdate from './NewsletterFormUpdate';
import { Button, Col, Card, Modal, ThemeProvider } from 'react-bootstrap';

const _logger = debug.extend('Newslettercard');

function NewsletterCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    _logger(props);
    const letter = props.letter;
    const readableDate = new Date(letter.dateToPublish).toDateString();

    const onEditClicked = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const onDeleteClicked = (e) => {
        e.preventDefault();
        props.onParentDelete(letter, e);
    };

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Newsletter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewsletterFormUpdate letter={letter} onClose={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
                <Col sm={6} md={3} lg={3}>
                    <Card className="card-content">
                        <Card.Title className="card-title-content">{letter.name}</Card.Title>
                        <Card.Body className="card-body-content">
                            <Card.Img className="img-sizing" variant="top" src={letter.coverPhoto} alt="coverImage" />
                        </Card.Body>
                        <Card.Subtitle className="card-subtitle-content">Published: {readableDate}</Card.Subtitle>
                        <div>
                            <button className="btn rounded dark icon-content">
                                <i className="dripicons-cloud-download"></i>
                            </button>
                            <button className="btn rounded dark icon-content" onClick={onEditClicked}>
                                <i className="dripicons-document-edit"></i>
                            </button>
                            <button className="btn rounded dark" onClick={onDeleteClicked}>
                                <i className="dripicons-trash icon-content"></i>
                            </button>
                        </div>
                    </Card>
                </Col>
            </ThemeProvider>
        </React.Fragment>
    );
}
NewsletterCard.propTypes = {
    letter: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coverPhoto: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
    }),
    onParentDelete: PropTypes.func,
};

export default NewsletterCard;
