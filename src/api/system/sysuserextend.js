import request from '@/utils/request'

/**
 * 用户扩展信息表分页查询
 * @param {查询条件} data
 */
export function listsysUserExtend(query) {
	return request({
		url: 'system/sysUserExtend/list',
		method: 'get',
		params: query,
	})
}

/**
 * 修改用户扩展信息表
 * @param data
 */
export function updatesysUserExtend(data) {
	return request({
		url: 'system/sysUserExtend',
		method: 'PUT',
		data: data,
	})
}
/**
 * 获取用户扩展信息表详情
 * @param {Id}
 */
export function getsysUserExtend(id) {
	return request({
		url: 'system/sysUserExtend/' + id,
		method: 'get'
	})
}

