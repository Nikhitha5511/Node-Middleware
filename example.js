const express = require("express");

const app = express();


app.get("/product-list", (req, res) => {
    const output = {
      success: true,
      results: [
        {
          id: 1,
          name: "T-Shirt",
        },
        {
          id: 2,
          name: "Shoes",
        },
      ],
    };
    res.json(output);
  });

app.listen(5000,()=>{
    console.log("server is up and running on port 5000");
})