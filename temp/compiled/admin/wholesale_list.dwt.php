<?php if ($this->_var['full_page']): ?>
<!doctype html>
<html>
<head><?php echo $this->fetch('library/admin_html_head.lbi'); ?></head>

<body class="iframe_body">
	<div class="warpper">
    	<div class="title">供求 - <?php echo $this->_var['ur_here']; ?></div>
        <div class="content">
            <?php echo $this->fetch('library/common_tabs_info.lbi'); ?>
        	<div class="explanation m10" id="explanation">
            	<div class="ex_tit">
					<i class="sc_icon"></i><h4><?php echo $this->_var['lang']['operating_hints']; ?></h4><span id="explanationZoom" title="<?php echo $this->_var['lang']['fold_tips']; ?>"></span>
                    <?php if ($this->_var['open'] == 1): ?>
                    <div class="view-case">
                    	<div class="view-case-tit"><i></i><?php echo $this->_var['lang']['view_tutorials']; ?></div>
                        <div class="view-case-info">
                        	<a href="http://help.ecmoban.com/article-6545.html" target="_blank">商城批发管理活动说明</a>
                        </div>
                    </div>			
                    <?php endif; ?>				
				</div>
                <ul>
                	<li>展示了所有批发方案相关信息：商家名称、商品名称、使用会员等级、是否启用批发方案。</li>
                    <li>可以进行添加批发方案、批量添加、批量删除等操作。</li>
                    <li>可根据条件如商品名称、店铺名称等搜索出具体批发方案信息。</li>
                </ul>
            </div>
        	<div class="tabs_info">
            	<ul>
                    <li class="curr"><a href="wholesale.php?act=list<?php echo $this->_var['seller_list']; ?>">批发商品列表</a></li>
                    <?php if (! $this->_var['rs_id']): ?><li><a href="wholesale_cat.php?act=list<?php echo $this->_var['seller_list']; ?>">批发分类列表</a></li><?php endif; ?>
                </ul>
            </div>	            
            <div class="flexilist">
            	<div class="common-head">
                    <?php if (! $this->_var['rs_id']): ?>
                	<div class="fl">
						<a href="wholesale.php?act=add"><div class="fbutton"><div class="add" title="添加批发方案"><span><i class="icon icon-plus"></i>添加批发方案</span></div></div></a>
					</div>
                    <?php endif; ?>
                    <div class="refresh">
                    	<div class="refresh_tit" title="<?php echo $this->_var['lang']['refresh_data']; ?>"><i class="icon icon-refresh"></i></div>
                    	<div class="refresh_span"><?php echo $this->_var['lang']['refresh_common']; ?><?php echo $this->_var['record_count']; ?><?php echo $this->_var['lang']['record']; ?></div>
                    </div>
                    <div class="search">
                    	<form action="javascript:;" name="searchForm" onSubmit="searchGoodsname(this);">
						<?php echo $this->fetch('library/search_store.lbi'); ?>
                        <?php if ($this->_var['common_tabs']['info']): ?>
                        <div class="select m0">
                            <div class="imitate_select select_w170">
                                <div class="cite"><?php echo $this->_var['lang']['adopt_status']; ?></div>
                                <ul>
                                    <li><a href="javascript:;" data-value="0" class="ftx-01"><?php echo $this->_var['lang']['adopt_status']; ?></a></li>
                                    <li><a href="javascript:;" data-value="1" class="ftx-01"><?php echo $this->_var['lang']['not_audited']; ?></a></li>
                                    <li><a href="javascript:;" data-value="2" class="ftx-01"><?php echo $this->_var['lang']['audited_not_adopt']; ?></a></li>
                                    <li><a href="javascript:;" data-value="3" class="ftx-01"><?php echo $this->_var['lang']['audited_yes_adopt']; ?></a></li>
                                </ul>
                                <input name="review_status" type="hidden" value="0" id="">
                            </div>
                        </div>
                        <?php endif; ?>
                    	<div class="input">
                        	<input type="text" name="keyword" class="text nofocus" placeholder="<?php echo $this->_var['lang']['goods_name']; ?>" autocomplete="off" />
                            <input type="submit" class="btn" name="secrch_btn" ectype="secrch_btn" value="" />
                        </div>
                        </form>
                    </div>
                </div>
                <div class="common-content">
					<form method="post" action="" name="listForm">
                	<div class="list-div"  id="listDiv" >
						<?php endif; ?>
                    	<table cellpadding="1" cellspacing="1">
                        	<thead>
                            	<tr>
                                	<th width="3%" class="sign"><div class="tDiv"><input type="checkbox" name="all_list" class="checkbox" id="all_list" /><label for="all_list" class="checkbox_stars"></label></div></th>
                                    <th width="5%"><div class="tDiv"><?php echo $this->_var['lang']['record_id']; ?></div></th>
                                    <th width="30%"><div class="tDiv"><?php echo $this->_var['lang']['goods_name']; ?></div></th>
                                    <th width="15%"><div class="tDiv"><?php echo $this->_var['lang']['goods_steps_name']; ?></div></th>
                                    <th width="16%"><div class="tDiv">最小起订量</div></th>
                                    <th width="8%"><div class="tDiv"><?php echo $this->_var['lang']['enabled']; ?></div></th>
                                    <th width="8%"><div class="tDiv"><?php echo $this->_var['lang']['adopt_status']; ?></div></th>
                                    <th width="15%" class="handle"><?php echo $this->_var['lang']['handler']; ?></th>
                                </tr>
                            </thead>
                            <tbody>
							<?php $_from = $this->_var['wholesale_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'wholesale');if (count($_from)):
    foreach ($_from AS $this->_var['wholesale']):
?>
								<tr>
                                    <td class="sign">
                                        <div class="tDiv">
                                            <input type="checkbox" name="checkboxes[]" value="<?php echo $this->_var['wholesale']['act_id']; ?>" class="checkbox" id="checkbox_<?php echo $this->_var['wholesale']['act_id']; ?>" />
                                            <label for="checkbox_<?php echo $this->_var['wholesale']['act_id']; ?>" class="checkbox_stars"></label>
                                        </div>
                                    </td>
                                    <td><div class="tDiv"><?php echo $this->_var['wholesale']['act_id']; ?></div></td>
                                    <td><div class="tDiv"><?php echo htmlspecialchars($this->_var['wholesale']['goods_name']); ?></div></td>
                                    <td><div class="tDiv"><?php if ($this->_var['wholesale']['ru_name']): ?><font style="color:#F00;"><?php echo $this->_var['wholesale']['ru_name']; ?></font><?php else: ?><font class="blue">自营</font><?php endif; ?></div></td>
                                    <td><div class="tDiv"><?php echo $this->_var['wholesale']['moq']; ?></div></td>
                                    <td>
                                        <div class="tDiv">
                                            <div class="switch mauto <?php if ($this->_var['wholesale']['enabled']): ?>active<?php endif; ?>" onclick="listTable.switchBt(this, 'toggle_enabled', <?php echo $this->_var['wholesale']['act_id']; ?>)" title="<?php echo $this->_var['lang']['yes']; ?>">
                                                <div class="circle"></div>
                                            </div>
                                            <input type="hidden" value="0" name="">
                                        </div>
                                    </td>
                                    <td>
                                    	<div class="tDiv">
                                            <?php if ($this->_var['wholesale']['review_status'] == 1): ?>
                                            <font class="org2"><?php echo $this->_var['lang']['not_audited']; ?></font>
                                            <?php elseif ($this->_var['wholesale']['review_status'] == 2): ?>
                                            <font class="red"><?php echo $this->_var['lang']['audited_not_adopt']; ?></font><br/>
                                            <i class="tip yellow" title="<?php echo $this->_var['wholesale']['review_content']; ?>" data-toggle="tooltip"><?php echo $this->_var['lang']['prompt']; ?></i>
                                            <?php elseif ($this->_var['wholesale']['review_status'] == 3): ?>
                                            <font class="blue"><?php echo $this->_var['lang']['audited_yes_adopt']; ?></font>
                                            <?php endif; ?>									
                                        </div>
                                    </td>
                                    <td class="handle">
                                        <div class="tDiv a2">
                                            <a href="wholesale.php?act=edit&amp;id=<?php echo $this->_var['wholesale']['act_id']; ?>" title="<?php echo $this->_var['lang']['edit']; ?>" class="btn_edit"><i class="icon icon-edit"></i><?php echo $this->_var['lang']['edit']; ?></a>
                                            <a href="javascript:;" onclick="listTable.remove(<?php echo $this->_var['wholesale']['act_id']; ?>,'<?php echo $this->_var['lang']['drop_confirm']; ?>')" title="<?php echo $this->_var['lang']['remove']; ?>" class="btn_trash"><i class="icon icon-trash"></i><?php echo $this->_var['lang']['drop']; ?></a>
											<a href="../wholesale_goods.php?id=<?php echo $this->_var['wholesale']['act_id']; ?>" title="<?php echo $this->_var['wholesale']['goods_name']; ?>" class="btn_see" target="_blank"><i class="sc_icon sc_icon_see"></i>查看</a>
                                        </div>
                                    </td>
								</tr>
								<?php endforeach; else: ?>
								<tr><td class="no-records" colspan="8"><?php echo $this->_var['lang']['no_records']; ?></td></tr>
								<?php endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </tbody>
                            <tfoot>
                            	<tr>
									<td colspan="8">
                                        <div class="tDiv">
                                            <?php if ($this->_var['filter']['seller_list'] == 1): ?>
											<div class="tfoot_btninfo">
												<input type="hidden" value="batch" name="act">
												<div class="item">
													<div id="drop_select" class="imitate_select select_w120">
													  <div class="cite"><?php echo $this->_var['lang']['select_please']; ?></div>
													  <ul>
														 <li><a href="javascript:;" data-value="" class="ftx-01"><?php echo $this->_var['lang']['select_please']; ?></a></li>
														 <li><a href="javascript:;" data-value="batch_remove" class="ftx-01"><?php echo $this->_var['lang']['drop']; ?></a></li>
														 <li><a href="javascript:;" data-value="review_to" class="ftx-01">审核</a></li>
													  </ul>
													  <input name="type" type="hidden" value=""  id="drop_val">
													</div>
												</div>
												<div class="item" style="display: none;" id="review_status">
													<div id="review_status_select" class="imitate_select select_w120">
													  <div class="cite"><?php echo $this->_var['lang']['select_please']; ?></div>
													  <ul>
														 <li><a href="javascript:;" data-value="0" class="ftx-01">全部</a></li>
														 <li><a href="javascript:;" data-value="2" class="ftx-01">审核未通过</a></li>
														 <li><a href="javascript:;" data-value="3" class="ftx-01">审核通过</a></li>
													  </ul>
													  <input name="review_status" type="hidden" value="0" id="review_status_val">
													</div>
												</div>
												<input name="review_content" type="text" value="" class="text text_2 mr10 lh26" style="display:none" />
												<input type="submit" value="<?php echo $this->_var['lang']['button_submit_alt']; ?>" name="remove" ectype="btnSubmit" class="btn btn_disabled" disabled="">
											</div>
											<?php else: ?>
											<div class="tfoot_btninfo">
												<div class="shenhe">
													<input type="submit" name="drop" id="btnSubmit" value="<?php echo $this->_var['lang']['drop']; ?>" class="btn btn_disabled" disabled="true" ectype="btnSubmit" />
													<input type="hidden" name="act" value="batch" />
													<input name="type" type="hidden" value="batch_remove"  id="drop_val">
												</div>										
											</div>
											<?php endif; ?>
                                            <div class="list-page">
                                                <?php echo $this->fetch('library/page.lbi'); ?>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
					<?php if ($this->_var['full_page']): ?>
                    </div>
					</form>
                </div>
            </div>
        </div>
    </div>
 <?php echo $this->fetch('library/pagefooter.lbi'); ?>
	<script type="text/javascript">
        //分页传值
        listTable.recordCount = <?php echo empty($this->_var['record_count']) ? '0' : $this->_var['record_count']; ?>;
        listTable.pageCount = <?php echo empty($this->_var['page_count']) ? '1' : $this->_var['page_count']; ?>;
    
        <?php $_from = $this->_var['filter']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
        listTable.filter.<?php echo $this->_var['key']; ?> = '<?php echo $this->_var['item']; ?>';
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
		
	$.divselect("#drop_select","#drop_val",function(obj){
		changeAction();
	});
	
	function changeAction()
	{
	
	 var type = $("input[name='type']").val();
	 var review_status = $("#review_status");
	  // 切换商品审核列表的显示
	
	  review_status.css("display",type == 'review_to' ? '' : 'none');
	  if(type != 'review_to')
	  {
		review_status.css("display", 'none');
	  }
	}
    </script>
</body>
</html>
<?php endif; ?>