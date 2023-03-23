import { labelReplace } from "@x-drive/utils";
const ApiMap = new Map<string, string>();

/**添加并处理新的 api */
function addApiMap(apis: Record<string, string>, host: Record<string, string> = {}) {
    Object.keys(apis).forEach((key: string) => {
        let url = apis[key];
        url = labelReplace(url, host, true);
        ApiMap.set(key, url);
    });
}
export { addApiMap }

/**
 * 解析请求别名
 * @param uri 请求地址
 */
function resolve(uri: string) {
    var url = ApiMap.get(uri);
    if (url) {
        return url;
    }
    return uri;
}

export default resolve;