// @ts-ignore
import md5 from 'md5'
import axios from 'axios'

// Функция для формирования значения X-Auth на основе пароля и временного штампа
const generateXAuthHeaderValue = () => {
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
	return md5(`${'Valantis'}_${timestamp}`)
}

const instance = axios.create({
	baseURL: 'http://api.valantis.store:40000/',
	headers: {
		'X-Auth': generateXAuthHeaderValue()
	}
})

export const API = {
	get_ids: async (offset: number, limit: number) => {
		return await instance.post('', {
			'action': 'get_ids',
			'params': { 'offset': offset, 'limit': limit }
		})
	},
	get_items: async (ids: string[]) => {
		return await instance.post('', {
			'action': 'get_items',
			'params': { 'ids': ids }
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