import request from '@/utils/request'
import { downFile } from '@/utils/request'

/**
 * 行政区域分页查询
 * @param {查询条件} data
 */
export function listSysArea(query) {
	return request({
		url: 'System/SysArea/list',
		method: 'get',
		params: query,
	})
}

/**
 * 行政区域tree查询
 * @param {查询条件} data
 */
export function treelistSysArea(query) {
	return request({
		url: 'System/SysArea/treelist',
		method: 'get',
		params: query,
	})
}
/**
 * 新增行政区域
 * @param data
 */
export function addSysArea(data) {
	return request({
		url: 'System/SysArea',
		method: 'post',
		data: data,
	})
}
/**
 * 修改行政区域
 * @param data
 */
export function updateSysArea(data) {
	return request({
		url: 'System/SysArea',
		method: 'PUT',
		data: data,
	})
}
/**
 * 获取行政区域详情
 * @param {Id}
 */
export function getSysArea(id) {
	return request({
		url: 'System/SysArea/' + id,
		method: 'get'
	})
}

/**
 * 删除行政区域
 * @param {主键} pid
 */
export function delSysArea(pid) {
	return request({
		url: 'System/SysArea/delete/' + pid,
		method: 'POST'
	})
}
// 导出行政区域
export async function exportSysArea(query) {
	await downFile('System/SysArea/export', { ...query })
}