import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function uploadFile(key: string, body: Buffer | Uint8Array) {
  return s3.upload({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: body,
  }).promise();
}

export function getFileUrl(key: string) {
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
}