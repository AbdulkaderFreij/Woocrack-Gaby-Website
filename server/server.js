const express=require("express");
const cors=require("cors");
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cors());
const bodyparser=require('body-parser');
app.use(bodyparser.json());

const PORT=5000;

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
