import axios, { AxiosInstance } from 'axios'
import { IncomingHttpHeaders } from 'http'
import { MidtransError } from './midtransError'
import { HttpClientOptions } from '../types/HttpClient'

/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */

export class HttpClient {
	private readonly parent: HttpClientOptions
	private readonly httpClient: AxiosInstance
	private readonly headers: IncomingHttpHeaders
	private readonly reqBodyPayload?: any
	private readonly reqQueryParam?: any

	constructor({ ...options }: HttpClientOptions) {
		this.parent = options
		this.httpClient = axios.create()
		this.headers = {
			'content-type': 'application/json',
			'accept': 'application/json',
			'user-agent': 'midtransclient-nodejs/1.2.1'
		}
		this.reqBodyPayload = {}
		this.reqQueryParam = {}
	}

	// request(httpMethod, serverKey, requestUrl, firstParam = {}, secondParam = {}): Promise<any> {
	// 	const headers = this.headers
	// 	let reqBodyPayload = this.reqBodyPayload
	// 	let reqQueryParam = this.reqQueryParam

	// 	if (httpMethod.toLowerCase() === 'get') {
	// 		// GET http request will use first available param as URL Query param
	// 		reqQueryParam = firstParam
	// 		reqBodyPayload = secondParam
	// 	} else {
	// 		// Non GET http request will use first available param as JSON payload body
	// 		reqBodyPayload = firstParam
	// 		reqQueryParam = secondParam
	// 	}

	// 	return new Promise(function (resolve, reject) {
	// 		// Reject if param is not JSON
	// 		if (typeof reqBodyPayload === 'string' || reqBodyPayload instanceof String) {
	// 			try {
	// 				reqBodyPayload = JSON.parse(reqBodyPayload)
	// 			} catch (err) {
	// 				reject(
	// 					new MidtransError(
	// 						`fail to parse 'body parameters' string as JSON. Use JSON string or Object as 'body parameters'. with message: ${err}`
	// 					)
	// 				)
	// 			}
	// 		}
	// 		// Reject if param is not JSON
	// 		if (typeof reqQueryParam === 'string' || reqQueryParam instanceof String) {
	// 			try {
	// 				reqQueryParam = JSON.parse(reqQueryParam)
	// 			} catch (err) {
	// 				reject(
	// 					new MidtransError(
	// 						`fail to parse 'query parameters' string as JSON. Use JSON string or Object as 'query parameters'. with message: ${err}`
	// 					)
	// 				)
	// 			}
	// 		}

	// 		const response = axios({
	// 			method: httpMethod,
	// 			headers: headers,
	// 			url: requestUrl,
	// 			data: reqBodyPayload,
	// 			params: reqQueryParam,
	// 			auth: {
	// 				username: serverKey,
	// 				password: ''
	// 			}
	// 		})
	// 			.then(function (res) {
	// 				// Reject core API error status code
	// 				if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 400 && res.data.status_code !== 407) {
	// 					// 407 is expected get-status API response for `expire` transaction, non-standard
	// 					reject(
	// 						new MidtransError(
	// 							`Midtrans API is returning API error. HTTP status code: ${
	// 								res.data.status_code
	// 							}. API response: ${JSON.stringify(res.data)}`,
	// 							res.data.status_code,
	// 							res.data,
	// 							res
	// 						)
	// 					)
	// 				}
	// 				resolve(res.data)
	// 			})
	// 			.catch(function (err) {
	// 				const res = err.response
	// 				// Reject API error HTTP status code
	// 				if (typeof res !== 'undefined' && res.status >= 400) {
	// 					reject(
	// 						new MidtransError(
	// 							`Midtrans API is returning API error. HTTP status code: ${res.status}. API response: ${JSON.stringify(
	// 								res.data
	// 							)}`,
	// 							res.status,
	// 							res.data,
	// 							res
	// 						)
	// 					)
	// 					// Reject API undefined HTTP response
	// 				} else if (typeof res === 'undefined') {
	// 					reject(
	// 						new MidtransError(
	// 							`Midtrans API request failed. HTTP response not found, likely connection failure, with message: ${JSON.stringify(
	// 								err.message
	// 							)}`,
	// 							null,
	// 							null,
	// 							err
	// 						)
	// 					)
	// 				}
	// 				reject(err)
	// 			})
	// 	})
	// }
}
