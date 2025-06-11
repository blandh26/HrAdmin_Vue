import request from '@/utils/request'

/**
 * 积分记录表分页查询
 * @param {查询条件} data
 */
export function listFPointslog(query) {
	return request({
		url: 'frontEnd/FPointslog/list',
		method: 'get',
		params: query,
	})
}

/**
 * 获取积分记录表详情
 * @param {Id}
 */
export function getFPointslog(id) {
	return request({
		url: 'frontEnd/FPointslog/' + id,
		method: 'get'
	})
}

