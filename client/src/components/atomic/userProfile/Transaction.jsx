import { useState, useEffect } from "react";
import { Row, Col, Image, Carousel } from "react-bootstrap";
import { userImages } from "../getAllImages/GetImages";


//componen use for page prodile user and admin page
export default function Transaction( { data } ){

    const [order, setOrder]=useState([])
    const [totalOne, setTotalOne]=useState([]);
    const [status, setStatus]=useState({});

    const show = ()=> {
        // order.map( data => {
        //     console.log(data.toppings);
        // }) 
    }

    useEffect(()=> {
        data.status=="Waiting Approve" && setStatus({waiting:true});
        data.status=="Cancel" && setStatus({cancel:true});
        data.status=="On The Way" && setStatus({onTheWay:true});

        setOrder(data.order)
        let totalAll=[];
        for(let i=0; i<data.order.length; i++){
            let totalTopping=0;
            let productPrice=data.order[i].price;
            for(let j=0; j<data.order[i].toppings.length; j++){
                totalTopping+=data.order[i].toppings[j].price;
                // console.log(data.order[i].toppings[j].price);
            }
            productPrice+=totalTopping
            totalAll.push(productPrice);
        }
        setTotalOne(totalAll);
    },[])

    return(
        <>
            <Col md={8} className="order-border">
                <Row className="mb-4 d-flex align-items-center justify-content-center">
                    {
                        order.map( ( data, i ) => {
                            return(
                                <Row className="d-flex align-items-center">
                                    <Col md={4}>
                                        <Image className="img-fluid" src={data.image}></Image>
                                    </Col>
                                    <Col md={8}>
                                        <div className="name-date lh-xs mt-2">
                                            <p className="lh-s fw-bold text-red">{data.title}</p>
                                            <p className="fs-8"> <span class="fw-bold text-red">Saturday</span> , 5 March 2020</p>
                                        </div>
                                        <div className="lh-xs">
                                            <p className='fs-8'>Toping: {
                                                data.toppings.map( topping => <span> {topping.name}, </span>)
                                            }</p>
                                            <p className="fs-8">Price: {totalOne[i]}</p>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    
                </Row>
            </Col>
            <Col md={4} className='text-center'>
                <Row>
                    <Col className='mb-1'>
                        <Image src={userImages.navIcon}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col className='my-3'>
                        <Image className="tr-profile-img" src={data.attachment}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { status.success && <p onClick={show} className={`fs-8 success-status status2 py-2 fw-bold`}>Success</p> }
                        { status.cancel && <p onClick={show} className={`fs-8 cancel-status status3 py-2 fw-bold`}>Cancel</p> }
                        { status.onTheWay && <p onClick={show} className={`fs-8 way-status status4 py-2 fw-bold`}>On The Way</p> }
                        { status.waiting && <p onClick={show} className={`fs-8 wait-status status1 py-2 fw-bold`}>Process</p> }
                        <p className='fs-8 text-soft-red fw-bold'>Total : {data.income}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='fs-8 fw-bold'></p>
                    </Col>
                </Row>
            </Col>
        </>
    );
}