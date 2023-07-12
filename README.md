# NodeJs 服务端 Http 请求模块

> 简易的支持自动域名替换、接口别名的请求模块

## 使用

- 将 `@x-drive/fetch` 加入到项目依赖中
- 模块最基本的请求方法是 `fetch`, 由于是基础方法是以参数会比较复杂, 一般情况下建议直接使用 `get` 或 `post` 方法发起请求。
- 模块默认使用 `console` 输出异常信息, 如系统本身有其他 logger , 可调用模块的 `setLogger` 方法设置模块的信息输出对象。
- 如果希望使用别名、自动域名替换，请在 **发起请求** 前调用 `addApiMap` 方法提前设置好 api

## 方法

- `fetch` 基础请求方法
    ```ts
    /**
    * 获取数据
    * @param type              请求类型
    * @param uri               请求地址
    * @param query             请求参数
    * @param data              发送数据
    * @param config            请求配置
    * @param needProcessConfig 是否需要处理配置
    */
    function fetch<T = unknown>(type: string, uri: string, query?: Record<string, any>, data?: any, config?: IFetchConfig, retry?: number, needProcessConfig?: boolean): Promise<T>;
    ```
- `get` 发起一个 get 请求
    ```ts
    /**
    * 发起一个 get 请求
    * @param uri   请求地址
    * @param query 请求参数
    */
    function get<T = unknown>(uri: string, query?: Record<string, any>, config?: IFetchConfig): Promise<T>;
    ```
- `post` 发起一个 post 请求
    ```ts
    /**
    * 发起一个 post 请求
    * @param uri   请求地址
    * @param query 请求参数
    * @param data  请求数据
    */
    function post<T>(uri: string, query?: any, data?: any, config?: IFetchConfig): Promise<T>;
    ```
- `setDefHeaders` 设置默认 Headers
    ```ts
    /**设置默认 Headers */
    function setDefHeaders(headers: Record<string, any>): void;
    ```
- `setDefConfig` 设置默认全局配置
    ```ts
    /**设置默认全局配置 */
    function setDefConfig(config: IFetchConfig): void;
    ```
- `setRandomStr` 给指定对象增加一个随机字符串
    ```ts
    /**给指定对象增加一个随机字符串 */
    function setRandomStr(query: any): void;
    ```
- `addApiMap` 添加并处理新的 api
    ```ts
    /**添加并处理新的 api */
    function addApiMap(apis: Record<string, string>, host?: Record<string, string>): void;
    ```
- `resolve` 解析请求别名
    ```ts
    /**
    * 解析请求别名
    * @param uri 请求地址
    */
    function resolve(uri: string): string;
    ```
- `setLogger` 设置模块 logger
    ```ts
    /**设置模块 logger */
    function setLogger(logger: any): void;
    ```
## 配置项
```ts
/**支持的返回数据类型 */
type IFetchType = "text" | "json" | "blob" | "buffer" | "arrayBuffer";

/**请求配置 */
interface IFetchConfig extends Partial<Omit<RequestInit, "body" | "method">> {
    /**数据返回类型 */
    type?: IFetchType;

    /**是否强制同源 */
    sameOrigin?: boolean;

    /**请求自动重试次数 */
    retry?: number;

    /**自动重试间隔时间 */
    retryDelay?: number;

    /**是否自动追加随机数retry，默认 false */
    random?: boolean;

    /**数据返回时的钩子 */
    onResponse?: (res?: Response) => Promise<unknown>;

    /**是否 stringify Post 请求数据，默认 true*/
    stringify?: boolean;

    /**
     * 是否不抛出异常, 默认 false
     * - 当有 retry 时会优先 retry, 都失败后才会抛异常
     * - 1.1.0 及以前版本不抛异常
     */
    silence?: boolean;
}
```