module.exports = function (Controller) {
	return class extends Controller {
		constructor() {
			super(...arguments);
		}
		async test1(post_name = "", indicies_name = "") {

			this.mongoose('s_monitor_datas', 'm_data');
			this.mongoose('s_monitor_posts', 'm_post');
			this.mongoose('s_env_measure_indicies', 'm_indices');

			var limit = this.getQueryFromRequest('limit') || 10,
				skip = this.getQueryFromRequest('skip') || 0,
				starttime = Date.now();
			return this.m_data.aggregate(
				[
					{
						$lookup: { from: 's_env_measure_indicies', localField: 'indicies_id', foreignField: '_id', as: 'indicies_data' }
					}, {
						$lookup: { from: 's_monitor_posts', localField: 'monitor_post_id', foreignField: '_id', as: 'smp_data' }
					}, {
						$match: {
							smp_data: {
								$elemMatch: { monitor_post_name: new RegExp("".toString(), "i") }
							}
						}
					}, {
						$skip: 61044
					}, {
						$limit: 10
					}
				]
			)
				.then(data => {
					console.log(Date.now() - starttime);
					return data;
				})
		}
		async test2(post_name = "", indicies_name = "") {

			this.mongoose('s_monitor_datas', 'm_data');
			this.mongoose('s_monitor_posts', 'm_post');
			this.mongoose('s_env_measure_indicies', 'm_indices');

			var limit = this.getQueryFromRequest('limit') || 10,
				skip = this.getQueryFromRequest('skip') || 0,
				starttime = Date.now();
			return this.m_post.find({ monitor_post_name: new RegExp(post_name, "i") })
				.then(postData => {
					return this.m_indices.find({ name: new RegExp(indicies_name, "i") })
						.then(indiciesData => {
							return this.pagination(this.m_data, {
								monitor_post_id: {
									$in: postData.map(item => item._id)
								},
								indicies_id: {
									$in: indiciesData.map(item => item._id)
								}
							}, Query => Query.populate('monitor_post_id').populate('indicies_id'))
						})
				}).then(data => {
                    console.log(Date.now() - starttime);
                    return data;
                })
		}
	}
}