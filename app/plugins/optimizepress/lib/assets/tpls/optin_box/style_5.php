<?php include 'style.inc.php'; ?>

<div id="<?php echo $id; ?>" class="optin-box optin-box-4 optin-box-4-blue"<?php echo $style_str; ?>>
	<?php
		$headline = op_get_var($content,'headline','','<h2>%1$s</h2>');
		_e(!empty($headline) ? $headline : '');
	?>
	<div class="optin-box-content">
		<?php
		$paragraph = op_get_var($content,'paragraph','');
		_e(!empty($paragraph) ? '<p class="description">'.strip_tags($paragraph).'</p>' : '');
		echo $form_open.$hidden_str;
		op_get_var_e($fields,'email_field');
		echo implode('',$extra_fields);
		echo $submit_button;
		?>
		</form>
		<?php op_get_var_e($content,'privacy','','<p class="privacy"><img src="'.OP_ASSETS_URL.'images/optin_box/privacy.png" alt="privacy" width="16" height="15" /> %1$s</p>') ?>
	</div>
</div>