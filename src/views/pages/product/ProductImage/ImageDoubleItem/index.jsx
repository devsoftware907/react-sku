import React, { useState, useEffect } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
} from 'reactstrap';

import APP_CONST from '../../../../../helper/constant';

const INIT_IMAGE_URL = {
    light: null,
    dark: null,
}

function ImageDoubleItem(props) {
    const [preview, setPreview] = useState(INIT_IMAGE_URL);
    const preFile = `${props.skuNumber}-${props.variant}-artwork`;

    useEffect(() => {
        if (Object.keys(props.themeUrl).length > 0) {
            props.source.colorList.map(el => {
                if (props.source.type === 2 && el.gender === 'M') {
                    let url = el.url
                    if (el.key === 'WH') {
                        if (Object.keys(props.themeUrl).includes('light') && props.themeUrl['light']) {
                            let artwork = props.themeUrl['light'].split('/')[props.themeUrl['light'].split('/').length - 1].slice(0, -4);
                            url = url.replace("[$artwork]", artwork);
                            setPreview(prevState => ({ ...prevState, light: url }));
                        }
                    } else if (el.key === 'BK') {
                        if (Object.keys(props.themeUrl).includes('dark') && props.themeUrl['dark']) {
                            let artwork = props.themeUrl['dark'].split('/')[props.themeUrl['dark'].split('/').length - 1].slice(0, -4);
                            url = url.replace("[$artwork]", artwork);
                            setPreview(prevState => ({ ...prevState, dark: url }));
                        }
                    }
                }
            });
        }
    }, [props.themeUrl])

    const handlePreview = (event, url) => {
        const name = event.target.getAttribute('name');
        if (url) {
            let artworkFile = props.imageUrl && Object.keys(props.imageUrl).includes(name) && props.imageUrl[name] ?
                props.imageUrl[name].split('/')[props.imageUrl[name].split('/').length - 1].slice(0, -4) :
                Object.keys(props.themeUrl).includes(name) && props.themeUrl[name] ?
                    props.themeUrl[name].split('/')[props.themeUrl[name].split('/').length - 1].slice(0, -4) : null;

            url = artworkFile ? url.replace("[$artwork]", artworkFile) : null;
            setPreview(prevState => ({ ...prevState, [name]: url }));
        }
    }

    return (
        <Card>
            <CardBody className="custom-product-image-card image-process-panel pb-1">
                <Row>
                    {Object.keys(INIT_IMAGE_URL).map(item => (
                        <Col md={2} className="p-0" key={item}>
                            <Row style={{ height: '2.5rem' }}>
                                {item === 'light' &&
                                    <Col md={12}>
                                        <h4 className="mb-4">{props.source.title}</h4>
                                    </Col>
                                }
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <img
                                        className="image-prview mb-2"
                                        src={
                                            (props.imageUrl && Object.keys(props.imageUrl).includes(item) && props.imageUrl[item]) ?
                                                props.imageUrl[item] : null
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Button
                                        id={`${preFile}-${item}`}
                                        name={item}
                                        type='button'
                                        color='primary'
                                        className="custom-upload-button mb-1"
                                        size="sm"
                                        style={{ width: '97%', fontSize: '0.65rem' }}
                                        onClick={(e) => props.onUploadFile(e, props.variant)}
                                    >
                                        {`Upload ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Button
                                        id={`${preFile}-${item}`}
                                        name={item}
                                        type='button'
                                        color='primary'
                                        className="custom-upload-button"
                                        size="sm"
                                        style={{ width: '97%', fontSize: '0.65rem' }}
                                        onClick={(e) => props.onRemoveFile(e, props.variant)}
                                    >
                                        {`Remove ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                    {Array(props.source.type).fill(null).map((value, index) => (
                        <Col md={4} className="p-0" key={`${props.variant}-${index}`}>
                            <img
                                className="image-process mb-2"
                                src={APP_CONST.THEME[index] === 'D' ? preview.dark : preview.light}
                            />
                            {Array(props.source.gender).fill(null).map((val, idx) => (
                                <Row key={`${props.variant}-${index}-${idx}`}>
                                    <Col
                                        md={4} style={{ textAlign: 'end' }}
                                        className="pr-0"
                                    >
                                        <h5 className="custom-color-picker-title m-0">
                                            {APP_CONST.GENDER_LIST[idx].name}
                                        </h5>
                                    </Col>
                                    <Col
                                        md={8}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <div className="custom-color-picker">
                                            {props.source.colorList.map(color => {
                                                if (color.theme === APP_CONST.THEME[index]
                                                    && (color.gender === '' || color.gender === APP_CONST.GENDER_LIST[idx].key)) {
                                                    return (
                                                        <div
                                                            key={`${color.key}-${idx}`}
                                                            name={color.theme === 'D' ? 'dark' : 'light'}
                                                            className="custom-color-picker-item-one mr-1"
                                                            style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                                            onClick={(e) => handlePreview(e, color.url)}
                                                        />
                                                    )
                                                }
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageDoubleItem;