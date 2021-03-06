var op_asset_settings = (function($){
	var cp_styles = [3, 4];
	return {
		help_vids: {
			step_1: {
				url: 'http://op2-inapp.s3.amazonaws.com/elements-file-download.mp4',
				width: '600',
				height: '341'
			},
			step_2: {
				url: 'http://op2-inapp.s3.amazonaws.com/elements-file-download.mp4',
				width: '600',
				height: '341'
			}
		},
		attributes: {
			step_1: {
				style: {
					type: 'style-selector',
					folder: 'previews',
					addClass: 'op-disable-selected',
				}
			},
			step_2: {
				
				elements: {
					type: 'multirow',
					multirow: {
						attributes: {
							/*level: {
								title: 'select_level',
								type: 'select',
								values: OPMLevels
							},
							packages: {
								title: 'select_packages',
								type: 'select',
								values: OPMPackages
							},*/
							icon: {
								title: 'icon',
								type: 'image-selector',
								folder: 'icons',
								selectorClass: 'icon-view-64'
							},
							file: {
								title: 'file',
								type: 'media'
							},
							title: {
								title: 'file_name'
							},
							content: {
								title: 'file_description',
								type: 'textarea',
								format: 'br'
							}
						},
						onAdd: function(steps){
							var $selected_style = steps[0].find('.op-asset-dropdown-list .selected');
							
							$selected_style.trigger('click');
						}
					}
				}
			},
			/*step_3: {
				font: {
					title: 'membership_download_title_styling',
					type: 'font'
				},
				content_font: {
					title: 'membership_download_content_styling',
					type: 'font'
				}
			}*/
		},
		insert_steps: {2:true},
		customInsert: function(attrs){
			//console.log(attrs);
			var str = '',
				//style = (attrs.style!='image' ? 'icon' : attrs.style) || 'icon',
				style = '',
				field = style == 'image' ? 'image' : 'icon',
				attrs_str = '';
			
			for(var i in attrs.elements){
				var v = attrs.elements[i],
					q = v.title || '', 
					a = v.content || '',
					file = v.file || '',
					pack = v.packages || '',
					level = v.level || '',
					ic = v[field] || '';
					bg = v.bg_color || '';
				str += '[download title="'+q.replace( /"/ig,"'")+'" '+field+'="'+ic+'" file="'+file+'" package="'+pack+'" level="'+level+'"]'+a+'[/download]';
			};
			/*$.each(['font','content_font'],function(i,v){
				$.each(attrs[v],function(i2,v2){
					if(v2 != ''){
						attrs_str += ' '+v+'_'+i2+'="'+v2.replace(/"/ig,"'")+'"';
					}
				});
			});*/
			str = '[file_download style="'+attrs.style+'"]'+str+'[/file_download]';
			OP_AB.insert_content(str);
			$.fancybox.close();
		},
		customSettings: function(attrs,steps){
			var features = attrs.download || {},
				add_link = steps[1].find('.field-id-op_assets_core_file_download_elements a.new-row'),
				feature_inputs = steps[1].find('.field-id-op_assets_core_file_download_elements-multirow-container'),
				style = attrs.attrs.style;	
			attrs = attrs.attrs;
			OP_AB.set_selector_value('op_assets_core_file_download_style_container',(style || ''));
			OP_AB.set_font_settings('font',attrs,'op_assets_core_file_download_font');
			OP_AB.set_font_settings('content_font',attrs,'op_assets_core_file_download_content_font');
			$.each(features,function(i,v){
				add_link.trigger('click');
				var cur = feature_inputs.find('.op-multirow:last'),
					attrs = v.attrs || {},
					//input = (cur.find('input:eq(0)').is(':hidden') ? cur.find('input:eq(0)').parents('.field-bg_color').next('.field-image').find('input') : cur.find('input:eq(0)')),
					uploader = cur.find('input:eq(0)'),
					selectLevel = cur.find('select:eq(0)'),
					selectPackage = cur.find('select:eq(1)');
				
				$('#' + selectPackage.attr('id')).val(attrs.package || '');
				$('#' + selectLevel.attr('id')).val(attrs.level || '');
				OP_AB.set_selector_value(cur.find('.op-asset-dropdown').attr('id'),(attrs.icon || ''));
				OP_AB.set_uploader_value(uploader.attr('id'), attrs.file);
				cur.find('input:eq(1)').val(attrs.title || '');
				cur.find('textarea').val(attrs.content || '');
			});
		}
	};
})(jQuery);