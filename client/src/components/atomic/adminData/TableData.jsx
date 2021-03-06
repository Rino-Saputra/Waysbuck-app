import { useState,useEffect } from "react"
import { Image } from "react-bootstrap";
import { API } from '../../../config/api'
import { doneStatus,cancelStatus, userImages, Transaction } from "../../../containerExport/exportModule";
import pendingImage from '../../../assets/icons/pending.png';


export default function TableData( { transaction,showTransaction, keyValue } ){

    const [status, setStatus]=useState({});
    const initStatus={ cancel: false, onTheWay: false, success: false, waiting: false, pending: false }

    const sendStatus={};
    let addRateStatusTable={};
    const confirmTrans = async ( confirmStatus ) => {
        confirmStatus=="Cancel" && setStatus( { ...initStatus, cancel: true } );
        confirmStatus=="On The Way" && setStatus( { ...initStatus, onTheWay: true } );

        sendStatus.status=confirmStatus;
        let body = JSON.stringify(sendStatus);

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await API.patch(`/fix_transaction/${transaction.id}`, body, config)//to fixtransaction status

        addRateStatusTable={
            idfix_transaction: transaction.id,
            idCustomer: transaction.idUser,
            employeeComment: "ok ready for delivery"
        }
        body = JSON.stringify(addRateStatusTable);

        const responseAPI= await API.post('/ratestatus', body, config);
        console.log(responseAPI);

        // console.log(response);
        // console.log("id transaction: "+transaction.id);//fix transaction id
        // console.log("id user: "+transaction.idUser);
        // console.log(confirmStatus);
    }

    useEffect(()=>{
        // setStatus( {cancel: false, onTheWay: false, success: false, waiting: true} );
        transaction.status=="Waiting Approve" && setStatus({waiting:true});
        transaction.status=="Cancel" && setStatus({cancel:true});
        transaction.status=="On The Way" && setStatus({onTheWay:true});
        transaction.status=="Success" && setStatus({success:true});
        transaction.status=="Pending" && setStatus({pending:true});
        // console.log(transaction.status);
    },[])

    return(
        <>
        <tr className="text-center">
            <td className="td">{keyValue}</td>
            <td className="td">{transaction.name}</td>
            <td className="td">{transaction.address}</td>
            <td className="td">{transaction.postCode}</td>
            <td className="income td">{transaction.income}</td>

            { status.success && (
                    <>
                        <td className="success-status td fw-bold">Success</td>
                        <td className="td text-center"><Image src={doneStatus}></Image></td>
                    </>
                )
            }

            { status.pending && ( 
                <>     
                    <td class="fw-bold text-danger">Pending</td>
                    <td className="td text-center"><Image className="pending-img" src={pendingImage}></Image></td>
                </>
                )
            }

            { status.cancel && (
                    <>
                        <td className="cancel-status td fw-bold">Cancel</td> 
                        <td className="td text-center"><Image src={cancelStatus}></Image></td>
                    </>
                )
            }
            
            { status.onTheWay &&(
                    <>
                        <td className="td way-status">On The Way</td>
                        <td className="td text-center"><Image src={doneStatus}></Image></td>
                    </>
                )
            }

            { status.waiting && (
                <>
                    <td onClick={ ()=>showTransaction(keyValue-1) } className="td wait-status fw-bold cursor-p">Waiting Approve</td>
                    <td className="td text-center py-1">
                        <p onClick={ ()=> confirmTrans("Cancel") }  className="cancel order-border cursor-p">Cancel</p>
                        <p onClick={ ()=> confirmTrans("On The Way") } className="approve order-border cursor-p">Approve</p>
                    </td>
                </>
                )   
                
            }
        </tr>

        </>
    )
}

// "idfix_transaction": 7,
//  "idCustomer":2,
//  "employeeComment": "ok ready for delivery"