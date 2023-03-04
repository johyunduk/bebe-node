export declare function loadDiaryList(userId: number): Promise<any>;
export declare function loadDiaryDetail(id: number, userId: any): Promise<any>;
interface DiaryInputs {
    title: string;
    content: string;
    weight: number;
    height: number;
}
export declare function saveDiary(body: DiaryInputs, userId: number): Promise<void>;
export declare function updateDiary(body: any, userId: any, diaryId: any): Promise<void>;
export declare function destroyDiary(userId: any, diaryId: any): Promise<void>;
export {};
