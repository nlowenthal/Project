import React, { useState, useEffect, useCallback } from 'react';
import './header.css';
import './body.css';
import toastr from 'toastr';
import debug from 'sabio-debug';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/en_US';
import videoBg from '../../assets/images/water-bubbles.mp4';
import NewsletterCard from './NewsletterCard';
import NewsletterFormInsert from './NewsletterFormInsert';
import * as newsletterService from '../../services/newsletterService';
import { Row, Button, Col, Container, Modal } from 'react-bootstrap';

function Newsletter() {
    const _logger = debug.extend('Newsletter');
    const [newsList, setNewsList] = useState({
        newsletters: [],
        arrayOfNewsletters: [],
        currentPage: 0,
        pageSize: 3,
        totalPages: 3,
    });
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState({
        search: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mapNewsletter = (letter) => {
        return <NewsletterCard key={letter.id} letter={letter} onParentDelete={onDeleteRequested} />;
    };

    const onDeleteRequested = useCallback((letter, eObj) => {
        _logger(letter.id, { letter, eObj });

        const handler = getDeleteSuccess(letter.id);

        newsletterService.deleteById(letter.id).then(handler).catch(onDeleteError);
    }, []);

    const getDeleteSuccess = (idToBeDeleted) => {
        _logger('getDeleteSuccessHandler', idToBeDeleted);
        toastr.success(idToBeDeleted, 'Successfully Deleted');
        return () => {
            _logger('onDeleteSuccess', idToBeDeleted);

            setNewsList((prevState) => {
                const newsletterData = { ...prevState };
                newsletterData.newsletters = [...newsletterData.newsletters];

                const idxOf = newsletterData.newsletters.findIndex((letter) => {
                    let result = false;
                    if (letter.id === idToBeDeleted) {
                        result = true;
                    }
                    return result;
                });

                if (idxOf >= 0) {
                    newsletterData.newsletters.splice(idxOf, 1);
                    newsletterData.arrayOfNewsletters = newsletterData.newsletters.map(mapNewsletter);
                }
                return newsletterData;
            });
        };
    };

    const onDeleteError = (err) => {
        _logger('deleting', err);
        toastr.error('Item was not deleted');
    };

    useEffect(() => {
        newsletterService
            .getPaginated(newsList.currentPage, newsList.pageSize)
            .then(onNewsletterSuccess)
            .catch(onNewsletterError);
    }, []);

    const onNewsletterSuccess = (data) => {
        _logger(data);
        let pageIndex = data.item.pageIndex;
        let pageSize = data.item.pageSize;
        let totalPages = data.item.totalPages;
        let arrayOfNews = data.item.pagedItems;
        setNewsList((prevState) => {
            const newArray = { ...prevState };
            newArray.newsletters = arrayOfNews;
            newArray.currentPage = pageIndex + 1;
            newArray.pageSize = pageSize;
            newArray.totalPages = totalPages;
            newArray.arrayOfNewsletters = arrayOfNews.map(mapNewsletter);
            return newArray;
        });
    };

    const onNewsletterError = (err) => {
        _logger(err);
    };
    const onPageChange = (page) => {
        newsletterService
            .getPaginated(page - 1, newsList.pageSize)
            .then(onNewsletterSuccess)
            .catch(onNewsletterError);
        setNewsList((prevSate) => {
            let nextPage = { ...prevSate };
            nextPage.currentPage = page - 1;
            return nextPage;
        });
    };

    const onAllClicked = (e) => {
        e.preventDefault();
        _logger(e.target);
        newsletterService.getPaginated(0, 6).then(onNewsletterSuccess).catch(onNewsletterError);
    };

    const onSearchChange = (e) => {
        const target = e.target;
        const newSearchValue = target.value;
        const nameOfField = target.name;
        _logger(target);
        setSearch((prevState) => {
            const newSearchObject = { ...prevState };
            newSearchObject[nameOfField] = newSearchValue;
            return newSearchObject;
        });
    };

    const onSearchClicked = (e) => {
        e.preventDefault();
        newsletterService.search(0, 10, search.search).then(onSearchSuccuess).catch(onSearchError);
    };

    const onSearchSuccuess = (data) => {
        let listOfNews = data.item.pagedItems;
        _logger(listOfNews);
        setNewsList((prevState) => {
            const searchNews = { ...prevState };
            searchNews.newsletters = listOfNews;
            searchNews.arrayOfNewsletters = listOfNews.map(mapNewsletter);
            return searchNews;
        });
    };

    const onSearchError = (err) => {
        _logger(err);
    };

    return (
        <>
            <Container className="container-view">
                <video src={videoBg} autoPlay loop muted />
                <Row className="text-sm-end search-bar">
                    <Col sm={8}>
                        <div className="text-sm-end">
                            <div className="btn-toolbar search-group">
                                <form className="btn-toolbar search-group">
                                    <input
                                        type="text"
                                        className="form-control  form-control-lg"
                                        id="search"
                                        name="search"
                                        placeholder="Search..."
                                        onChange={onSearchChange}
                                        value={search.search}
                                    />
                                    <Button
                                        style={{ marginLeft: '1mm' }}
                                        variant="secondary"
                                        id="search"
                                        type="submit"
                                        onClick={onSearchClicked}>
                                        Search
                                    </Button>

                                    <Button style={{ marginLeft: '1mm' }} variant="secondary" onClick={onAllClicked}>
                                        All
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="header-row">
                    <h1 className="header-content">Interrogas Newsletters</h1>
                    <h4 className="h4-center">
                        New, customize and download your emails
                        <br />
                        using a Visual Email Builder
                    </h4>
                    <p className="button-center">
                        <Button variant="danger" onClick={handleShow} className="rounded-pill mb-3 mt-2">
                            <i className="mdi mdi-plus"></i> Create Now
                        </Button>
                    </p>
                </Row>
                <Row></Row>
                <Row>
                    <Col sm={4}>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Newsletter</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewsletterFormInsert onClose={handleClose} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>

                <Row className="row-content">
                    <h1 className="h1-card-header">My Newsletters</h1>
                    {newsList.arrayOfNewsletters}
                </Row>
                <Row className="row-content">
                    <Pagination
                        className="pagination-align"
                        onChange={onPageChange}
                        currentPage={newsList.currentPage}
                        total={newsList.totalPages * 10}
                        locale={locale}
                    />
                </Row>
            </Container>
        </>
    );
}
export default Newsletter;
