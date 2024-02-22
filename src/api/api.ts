// @ts-ignore
import md5 from 'md5'
import axios from 'axios'
import { Product } from '../types'

// Функция для формирования значения X-Auth на основе пароля и временного штампа
const generateXAuthHeaderValue = () => {
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

	return md5(`Valantis_${timestamp}`)
}

const instance = axios.create({
	baseURL: 'http://api.valantis.store:40000/',
	headers: {
		'X-Auth': generateXAuthHeaderValue()
	}
})

export const API = {
	get_ids: async (offset = 1, limit = 10) => {
		return await instance.post<{ result: string[] }>('', {
			'action': 'get_ids',
			'params': { 'offset': offset, 'limit': limit }
		}).then(res => res.data)
	},
	get_items: async (ids: string[]) => {
		return await instance.post<{ result: Product[] }>('', {
			'action': 'get_items',
			'params': { 'ids': ids }
		}).then(res => {
			const data = res.data

			return data
		})
	},
	get_fields: async (field: string, offset: number, limit: number) => {
		return await instance.post('', {
			'action': 'get_fields',
			'params': { 'field': field, 'offset': offset, 'limit': limit }
		})
	},
	filter: async () => {
		return await instance.post('', {
				'action': 'filter',
				'params': { 'price': 17500.0 }
			}
		)
	}
}