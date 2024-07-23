const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./controller/db");
const jwt = require('jsonwebtoken');

// cors middleware
app.use(cors());

// body-parser middleware'i uygulamaya ekle
app.use(bodyParser.json()); // JSON verilerini işlemek için
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded verileri işlemek için

app.post("/check-user", (req, res) => {

    const token = req.body.token
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ data: "2" });
        }

        // Doğrulanmış token bilgilerini kullanarak işlem yapabiliriz
        res.json({ data: "1", username: decoded });
    });
})

app.get("/check-phone", (req, res) => {
    db.query("SELECT * FROM telefon_modelleri", (err, response) => {
        res.send(response)
    })
})

app.post("/add-stock", (req, res) => {
    db.query("SELECT * FROM telefon_modelleri", (err, response) => {
        const ID = req.body.id;
        const stock_count = Number(response[0].stok_miktari);
        const post_stock_count = Number(req.body.stok);
        const new_stock = stock_count + post_stock_count;
        console.log(ID)
        console.log(stock_count)
        console.log(post_stock_count)
        console.log(new_stock)
        db.query("UPDATE telefon_modelleri SET stok_miktari=? WHERE id=?", [new_stock, ID], (err2, response2) => {
            if (!err2) {
                console.log("UPDATE İŞLEMİ BAŞARILI")
                res.send("1")
            }
            else {
                console.log("UPDATE İŞLEMİ BAŞARISIZ")
                res.send("2")
            }
        })
    })
})

app.post("/add-phone", (req, res) => {
    const newBrand = {
        marka: req.body.brandValue,
        model: req.body.modelValue,
        renk: req.body.colorValue,
        depolama: req.body.storageValue,
        ram: req.body.ramValue,
        fiyat: req.body.priceValue,
        stok_miktari: req.body.stockCountValue
    };

    // INSERT INTO TELEFON EKLEME
    db.query('INSERT INTO telefon_modelleri SET ?', newBrand, (err, result) => {
        if (!err) {
            console.log("Veritabanına kayıt işlemi başarılı!");
            res.send("1")
        }
        else {
            console.log("Veritabanına kayıt işlemi başarısız!");
            res.send("2")
        }
    });
})

app.post("/remove-phone", (req, res) => {
    const ID = req.body.phoneID;
    db.query('DELETE FROM telefon_modelleri WHERE id = ?', [ID], (err, result) => {
        if (!err) {
            console.log("Telefon silme işlemi başarılı!");
            res.send("1")
        }
        else {
            console.log("Telefon silme işlemi başarısız!");
            res.send("2")
        }
    });
})

app.post("/sell-phone", (req, res) => {
    const ID = req.body.phoneValue;
    const name = req.body.nameValue;
    const surname = req.body.surnameValue;
    const TC = req.body.TCValue;
    db.query("SELECT * FROM telefon_modelleri WHERE id = ?", [ID], (err, response) => {
        const newSell = {
            marka: response[0].marka,
            model: response[0].model,
            renk: response[0].renk,
            depolama: response[0].depolama,
            ram: response[0].ram,
            fiyat: response[0].fiyat,
            ad: name,
            soyad: surname,
            tc: TC
        };

        // INSERT INTO sorgusu
        db.query('INSERT INTO telefon_satislari SET ?', newSell, (err, result) => {
            if (!err) {
                console.log("Veritabanına kayıt işlemi başarılı!");
                const new_stock=Number(response[0].stok_miktari-1);
                db.query("UPDATE telefon_modelleri SET stok_miktari=? WHERE id=?", [new_stock, ID], (err2, response2) => {
                    if (!err2) {
                        console.log("UPDATE İŞLEMİ BAŞARILI")
                        res.send("1")
                    }
                    else {
                        console.log("UPDATE İŞLEMİ BAŞARISIZ")
                        res.send("2")
                    }
                })
            }
            else {
                console.log("Veritabanına kayıt işlemi başarısız!");
                res.send("2")
            }
        });
    })
})

app.get("/check-sellinformation", (req, res) => {
    db.query("SELECT * FROM telefon_satislari", (err, response) => {
        res.send(response)
    })
})

app.post("/login", (req, res) => {
    const username = req.body.username
    const passwd = req.body.passwd
    db.query("SELECT * FROM telefon_admin WHERE username=? and passwd=?", [username, passwd], (err, response) => {
        if (response.length > 0) {
            // Örnek: Kullanıcı adı ve şifre doğru ise bir token oluşturulur.
            const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
            // Token'i response olarak gönderin.
            res.cookie('access_token', token, { httpOnly: true });
            res.send(token);
        }
        else {
            res.send("0");
        }
    })
})


app.listen(3001, () => {
    console.log("Sunucu 3001 portunda başlatıldı!");
})