import { useEffect, useState } from "react";
import "./PhoneList.css"
import axios from "axios";

function PhoneList() {

    const [phoneList, setPhoneList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/check-phone").then(response => {
            setPhoneList(response.data)
        })
    }, [])

    return (
        <>
            <div class="container">
                <h2 class="my-4">Ürün Listesi</h2>
                <div class="row">

                    {phoneList.map(e => (
                        <div key={e.id} class="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div class="card product-card">
                                <div class="card-body">
                                    <h5 class="card-title">{e.marka} {e.model}</h5>
                                    <p class="card-text"><strong>Marka:</strong> {e.marka}</p>
                                    <p class="card-text"><strong>Model:</strong> {e.model} S20</p>
                                    <p class="card-text"><strong>Renk:</strong> {e.renk}</p>
                                    <p class="card-text"><strong>Depolama:</strong> {e.depolama}</p>
                                    <p class="card-text"><strong>RAM:</strong> {e.ram}</p>
                                    <p class="card-text"><strong>Fiyat:</strong> {e.fiyat} TL</p>
                                    <p class="card-text"><strong>Stok Miktarı:</strong> {e.stok_miktari} Adet</p>
                                </div>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>
        </>
    );
}

export default PhoneList
