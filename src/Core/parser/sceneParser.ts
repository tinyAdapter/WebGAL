import {IAsset, IScene, ISentence} from "../interface/scene";
import {scriptParser} from "./scriptParser";
import {assetsPrefetcher} from "../util/assetsPrefetcher";
import {scenePrefetcher} from "../util/scenePrefetcher";


/**
 * 场景解析器
 * @param rawScene 原始场景
 * @param sceneName 场景名称
 */
export const sceneParser = (rawScene: string, sceneName: string): IScene => {
    const rawSentenceList = rawScene.split('\n');//原始句子列表
    const assetsList: Array<IAsset> = [];//场景资源列表
    const subSceneList: Array<string> = [];//子场景列表
    const sentenceList: Array<ISentence> = rawSentenceList.map(sentence => {
        const returnSentence: ISentence = scriptParser(sentence);
        //TODO: 在这里解析出语句可能携带的资源和场景，push 到 assetsList 和 subSceneList
        return returnSentence;
    });
    //开始资源的预加载
    assetsPrefetcher(assetsList);
    //开始场景的预加载
    scenePrefetcher(subSceneList);
    return {
        sceneName: sceneName, //场景名称
        sentenceList: sentenceList, //语句列表
        assetsList: assetsList, //资源列表
        subSceneList: subSceneList  //子场景列表
    };
}