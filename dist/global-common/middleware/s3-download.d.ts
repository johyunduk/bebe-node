import aws from 'aws-sdk';
export declare function downloadFile(params: {
    fileName: string;
    res: any;
    next: any;
}): Promise<void>;
export declare function getS3FileList(prefix: string): Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.ListObjectsOutput, aws.AWSError>>;
export declare const signedUrlOfS3: (key: string) => Promise<string>;
