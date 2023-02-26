import aws from 'aws-sdk';
export declare const commonConfigure: {
    s3: aws.S3;
    bucket: any;
    acl: string;
    serverSideEncryption: string;
    contentType: any;
    metadata: (req: any, file: any, cb: any) => void;
};
