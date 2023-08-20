const express = require("express")
const fs = require("fs");
const app = express();
const {loadAuthors} = require("./authors_model")
const {loadMagazines} = require("./archive_model")

app.set("view engine","ejs")
app.use(express.static("public"))

async function getMagazinesData() {
  try {
    const magazines = await loadMagazines(); // loadAuthors fonksiyonunu çağırır ve veriyi alır
    return magazines; // Alınan veriyi geri döndürür
  } catch (error) {
    console.error(error);
    return []; // Hata durumunda boş bir dizi döndürür
  }
}


app.use("/archive", async (req,res) => {
  try {
    const magazines = await getMagazinesData(); // Veriyi almak için getAuthorsData fonksiyonunu çağırır
    res.render("archive", { magazines: magazines }); // authors.ejs sayfasına veriyi gönderir
  } catch (error) {
    console.error(error);
    res.render("archive", { magazines: [] }); // Hata durumunda boş bir dizi gönderir
  }
})

app.use("/member-detail/:id", async (req, res) => {
  const ids = await getAuthorsData();
  const urun = ids.find(u => u.id == req.params.id) 
  res.render("member-detail", urun);
});

async function getAuthorsData() {
    try {
      const authors = await loadAuthors(); // loadAuthors fonksiyonunu çağırır ve veriyi alır
      return authors; // Alınan veriyi geri döndürür
    } catch (error) {
      console.error(error);
      return []; // Hata durumunda boş bir dizi döndürür
    }
}

app.use("/members",async (req,res)=>{
    try {
        const authors = await getAuthorsData(); // Veriyi almak için getAuthorsData fonksiyonunu çağırır
        res.render("members", { authors: authors }); // authors.ejs sayfasına veriyi gönderir
      } catch (error) {
        console.error(error);
        res.render("members", { authors: [] }); // Hata durumunda boş bir dizi gönderir
      }
})

app.use("/about",(req,res)=>{
    res.render("about");
})

app.use("/", async(req,res)=>{
  try {
    const magazines = await getMagazinesData(); // Veriyi almak için getAuthorsData fonksiyonunu çağırır
    res.render("index", { magazines: magazines }); // authors.ejs sayfasına veriyi gönderir
  } catch (error) {
    console.error(error);
    res.render("index", { magazines: [] }); // Hata durumunda boş bir dizi gönderir
  }
})

app.listen(process.env.PORT || 3000,() => {
  console.log("server");
});