process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const cookie =
  "session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall6WkdJNE5HUmhORFEzTldZNE1EZzVaRGcxTldFek5TSXNJbVZ0WVdsc0lqb2lkR1Z6ZERFd1FIUmxjM1F1WTI5dElpd2lhV0YwSWpveE5qYzFNek14TmpVMmZRLnVvbWNPMDVjakNyTVNmdWhKQjhreHBQX085ZXNFRlhla2E3X1dmNGFqSlEifQ==; path=/; httponly";

const doRequest = async () => {
  const { data } = await axios.post(
    `http://ticketing.dev/api/tickets`,
    { title: "ticket", price: 5 },
    { headers: { cookie } }
  );

  await axios.put(
    `http://ticketing.dev/api/tickets/${data.id}`,
    { title: "ticket", price: 10 },
    { headers: { cookie } }
  );

  await axios.put(
    `http://ticketing.dev/api/tickets/${data.id}`,
    { title: "ticket", price: 20 },
    { headers: { cookie } }
  );

  // const options = {
  //   method: "POST",
  //   url: "http://ticketing.dev/api/tickets",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Cookie: cookie,
  //   },
  //   data: { title: "ticket", price: 5 },
  // };
  // const { data } = await axios(options);

  // const putOptions = {
  //   method: "PUT",
  //   url: `https://ticketing.dev/api/tickets/${data.id}`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Cookie: cookie,
  //   },
  //   data: {
  //     title: "ticket",
  //     price: 10,
  //   },
  // };

  // const putOptions2 = {
  //   method: "PUT",
  //   url: `https://ticketing.dev/api/tickets/${data.id}`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Cookie: cookie,
  //   },
  //   data: {
  //     title: "ticket",
  //     price: 15,
  //   },
  // };

  // await axios(putOptions);
  // await axios(putOptions2);

  console.log("Request Complete");
};

(async () => {
  for (let i = 0; i < 500; i++) {
    doRequest();
  }
})();

// node index.js
// kubectl exec -it <MONGO POD NAME> -- sh
// mongosh
// use orders
// use tickets
