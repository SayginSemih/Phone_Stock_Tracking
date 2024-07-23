import { useEffect, useState, useRef } from "react"
import axios from "axios"


function SellPhone() {

    const [phoneList, setPhoneList] = useState([])

    const selectPhone = useRef();
    const selectName = useRef();
    const selectSurname = useRef();
    const selectTC = useRef();
    const phoneSellMessage = useRef();

    useEffect(() => {
        axios.get("http://localhost:3001/check-phone").then(response => {
            setPhoneList(response.data)
        })
    }, [])

    function sellPhone() {

        // DEĞERLERİ AL
        const phoneValue = selectPhone.current.value.trim();
        const nameValue = selectName.current.value.trim();
        const surnameValue = selectSurname.current.value.trim();
        const TCValue = selectTC.current.value.trim();

        if (!phoneValue || !nameValue || !surnameValue || !TCValue) {
            phoneSellMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post("http://localhost:3001/sell-phone", {
                phoneValue,
                nameValue,
                surnameValue,
                TCValue
            }).then(response => {
                if (response.data == "1") {
                    phoneSellMessage.current.innerHTML = `
                    <div class="alert alert-success" role="alert">
                      Satış kaydı başarıyla eklendi!
                    </div>
                `;
                }
                else {
                    phoneSellMessage.current.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                      Satış kaydı eklenme işlemi sırasında bir hata meydana geldi!
                    </div>
                `;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <div class="container mt-5">
                <h1 class="mb-4">Telefon Satış Sayfası</h1>

                <div class="form-group">
                    <label for="telefonMarka">Telefon Seçiniz:</label>
                    <select ref={selectPhone} class="form-control" id="telefonMarka">
                        {phoneList.map(e => (
                            <option key={e.id} value={e.id}>{e.marka} {e.model} {e.marka} {e.renk} {e.depolama} GB {e.marka} {e.ram}</option>
                        ))}
                    </select>
                </div>

                <div class="form-group">
                    <label for="ad">Adınız:</label>
                    <input ref={selectName} type="text" class="form-control" id="ad" />
                </div>
                <div class="form-group">
                    <label for="soyad">Soyadınız:</label>
                    <input ref={selectSurname} type="text" class="form-control" id="soyad" />
                </div>
                <div class="form-group">
                    <label for="tc">TC Kimlik Numaranız:</label>
                    <input ref={selectTC} type="text" class="form-control" id="tc" />
                </div>

                <button onClick={sellPhone} class="btn btn-primary mt-2">Satın Al</button>
                <div ref={phoneSellMessage}></div>
            </div>
        </>
    )
}

export default SellPhone
