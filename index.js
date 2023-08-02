require("dotenv").config();
const {
  CasperClient,
  Keys,
  DeployUtil,
  CLPublicKey
} = require("casper-js-sdk");

const keys = Keys.Ed25519.loadKeyPairFromPrivateFile("./keys/secret_key.pem");

const client = new CasperClient("http://52.34.201.174:7777/rpc");

let deployParams = new DeployUtil.DeployParams(keys.publicKey, "casper-test");

const session =
  DeployUtil.ExecutableDeployItem.newTransferWithOptionalTransferId(
    1_000_000_000,
    CLPublicKey.fromHex(
      "0203cf94e69555e840734a02c83aec2154af27be4c41cc1680e60dff68b5585060ed"
    )
  );

const payment = DeployUtil.standardPayment(1_000_000_000);
const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
const signedDeploy = DeployUtil.signDeploy(deploy, keys);

client
  .speculativeDeploy(signedDeploy)
  .then(result => {
    console.log(result.data);
  })
  .catch(error => {
    console.error(error);
  });
