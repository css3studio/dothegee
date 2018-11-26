/*
Theme Name: admin_collection
Theme URI: http://www.sda.kr
Author: css3studio
Version:1.0
*/
var $ = jQuery.noConflict();
var focused_section_no = 0;
var grid = new Array();
$(document).ready(function() {
	grid[0] = new Muuri('.field--section-unit-0 .section-wrapper', {
 		items: '.form-item',
 		dragEnabled: true,
 		dragAxis: 'y'
	});

	//요소 추가
	$('.item-palette-one .add-item').click(function(){
		var ele = $('<div/>').addClass('form-item');
		ele.append($(this).next().find('.item-content').clone());
		ele.append($('<div class="item-control"><a class="item-move"><i class="xi-arrows"></i></a><a href="#" class="item-remove"><i class="xi-close"></i></a></div>'));
		var item = ele.get(0);
		grid[focused_section_no].add([item]);
		grid[focused_section_no].synchronize();
	});
	//요소 삭제
	$(document).on('click','.form-item .item-control .item-remove',function(){
		var ele = $(this).parents('.form-item');
		var item = ele.get(0);
		grid[focused_section_no].remove([item], {removeElements: true});
		grid[focused_section_no].synchronize();
		return false;
	});
	//섹션 추가
	$('.add--section-unit button').click(function(){
		var index = $('.field--section-unit:not(.add--section-unit)').length;
		var ele = $('<div/>').addClass('field--section-unit');
		ele.append($('<dl class="section_title"><dt>섹션</dt><dd>컬렉션 내에 주요한 영역을 나눕니다.</dd></dl>'));
		ele.append($('<a class="close-section"><i class="xi-close"></i></a>'));
		ele.append($('<div class="section-title-area"><label for="" class="js-form-required form-required">섹션제목</label><input class="js-text-full text-full form-text required" type="text" value="" maxlength="255" placeholder="섹션제목" required="required" aria-required="true" /></div>'));
		ele.append($('<div class="section-wrapper grid"></div>'));
		ele.insertBefore('.collection-wrapper .add--section-unit');
		grid[index] = new Muuri($('.section-wrapper',ele).get(0), {
	 		items: '.form-item',
	 		dragEnabled: true,
	 		dragAxis: 'y'
		});
	});
	//섹션 초첨 이동
	$(document).on('click','.field--section-unit:not(.add--section-unit)',function(){
		$('.field--section-unit.on-focus').removeClass('on-focus');
		$(this).addClass('on-focus');
		focused_section_no = $('.field--section-unit').index($(this));
	});
	//섹션 닫기
	$(document).on('click','.field--section-unit .close-section',function(event){
		event.stopPropagation();
		var section = $(this).parents('.field--section-unit');
		var index = $('.field--section-unit').index(section);
		if(index == focused_section_no){
			section.prev().addClass('on-focus');
			//focused_section_no = index - 1;
		}
		grid.splice(index,1);
		section.remove();
		focused_section_no = $('.field--section-unit').index($('.field--section-unit.on-focus'));
	});
});
