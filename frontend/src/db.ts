import { connect } from "@planetscale/database";

const config = {
	host: "aws.connect.psdb.cloud",
	username: "w6kn8nmp10dk7rq8cy1z",
	password: "pscale_pw_zc6FkAg5cV1syZpUqoZydrRiLnwspSFh2TXgoHOpFbj",
};
 
const db = connect(config);

export const sql = db.execute;
