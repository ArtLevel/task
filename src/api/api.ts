// @ts-ignore
import md5 from 'md5'
import axios from 'axios'
import { Product } from '../types'
import { FormikValues } from '../components/Filter'

type DataForGetFields = {
	action: string
	params?: {
		field?: string
		offset?: number
		limit?: number
	}
}

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
	get_ids: async (offset?: number, limit?: number) => {
		let params = {}

		if (offset || limit) {
			params = {
				'offset': offset,
				'limit': limit
			}
		}

		return await instance.post<{ result: string[] }>('', {
			'action': 'get_ids',
			'params': params
		}).then(res => {
			return res.data
		})
	},
	get_items: async (ids: string[]) => {
		return await instance.post<{ result: Product[] }>('', {
			'action': 'get_items',
			'params': { 'ids': ids }
		}).then(res => {
			const data = res.data.result

			// Проверка на дубликаты
			const uniqueArray = data.reduce((accumulator: Product[], currentValue) => {
				const ids = accumulator.map(item => item.id)

				if (!ids.includes(currentValue.id)) {
					accumulator.push(currentValue)
				}

				return accumulator
			}, [])

			return { result: uniqueArray }
		})
	},
	get_fields: async (field?: string, offset?: number, limit?: number) => {
		let params = {}
		const data: DataForGetFields = {
			'action': 'get_fields'
		}

		if (field && offset && limit) {
			params = {
				'field': field,
				'offset': offset,
				'limit': limit
			}
			data.params = params
		}

		return await instance.post<{ result: string[] }>('', data).then(res => res.data)
	},
	filter: async (data: FormikValues) => {
		const value = Number.isInteger(data.value[0]) ? Number(data.value) : data.value

		return await instance.post<{ result: string[] }>('', {
				'action': 'filter',
				'params': { [data.filterType]: value }
			}
		).then(res => res.data)
	}
}