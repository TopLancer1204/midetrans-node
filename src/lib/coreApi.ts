import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'
import { Transaction } from './transaction'
import { matchCharge } from '../utils/matchCharge'
import {
	CoreApiOptions,
	ChargeTypeRequest,
	CaptureRequest,
	CardRegisterRequest,
	CardTokenRequest
} from '../types/CoreApi'

/**
 * CoreApi Midtrans is a RESTful Web Service served as a communication bridge between merchants and our payment channels.
 */
export class CoreApi {
	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */
	public apiConfig: InstanceType<typeof ApiConfig>
	public httpClient: InstanceType<typeof HttpClient>
	public transaction: InstanceType<typeof Transaction>
	private apiUrl: string
	private requestPayload: any

	constructor(options: CoreApiOptions | Record<string, any> = {}) {
		this.apiConfig = new ApiConfig(options)
		this.httpClient = new HttpClient(this)
		this.transaction = new Transaction(this)
	}

	/**
	 * Perform a transaction with various available payment methods and features. Example given: Credit Card Charge.
	 * @param  parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public charge<T extends Partial<ChargeTypeRequest>>(
		parameter: T | Record<string, any> = {}
	): Promise<Record<string, any>> {
		this.apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/charge'
		return this.httpClient.request({
			requestUrl: this.apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload:
				parameter === null
					? parameter
					: !matchCharge(Object.keys(parameter)[0])
					? parameter
					: Object.values(parameter)[0]
		})
	}

	/**
	 *  Capture an authorized transaction for card payment
	 * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public capture<T extends CaptureRequest>(parameter: T | Record<string, any> = {}): Promise<Record<string, any>> {
		this.apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/capture'
		return this.httpClient.request({
			requestUrl: this.apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
	}

	/**
	 * Register card information (card number and expiry) to be used for two clicks and one click
	 * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardRegister<T extends CardRegisterRequest>(
		parameter: T | Record<any, any> = {}
	): Promise<Record<string, any>> {
		this.apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/card/register'
		return this.httpClient.request({
			requestUrl: this.apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
	}

	/**
	 * Tokenize Credit Card information before being charged
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardToken<T extends CardTokenRequest>(parameter: T | Record<string, any> = {}): Promise<Record<string, any>> {
		this.apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/token'
		return this.httpClient.request({
			requestUrl: this.apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
	}

	/**
	 * Get the point balance of the card in denomination amount
	 * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardPointInquiry(tokenId: string): Promise<Record<string, any>> {
		this.apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/point_inquiry/' + tokenId
		return this.httpClient.request({
			requestUrl: this.apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey
		})
	}
}
