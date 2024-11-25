import './E061-FK-modify_long_site_name.cy'
import './E062-FK-modify_numeric_site_name.cy'
import './E063-FK-update_alphanumeric_site_description.cy'
import './E064-FK-update_long_site_description.cy'
import './E065-FK-update_lang_longtxt.cy'
import './E066-FK-update_lang_alphanumeric.cy'
import './E067-FK-update_lang_number.cy'
import './E068-FK-update_metadata_title_alphanumeric.cy'
import './E069-FK-update_metadata_title_long.cy'
import './E070-AP-update_metadata_description_general.cy'
import './E071-AP-update_metadata_description_long.cy'
import './E072-AP-update_complete_facebook_acc_title.cy'
import './E073-AP-update_invalid_txt_cancel_facebook.cy'
import './E074-AP-update_complete_x_acc_title.cy'
import './E075-AP-update_invalid_txt_cancel_x.cy'
import './E076-AP-update_xcard_title.cy'
import './E077-AP-update_xcard_description.cy'
import './E078-AP-update_facebookcard_title.cy'
import './E079-AP-update_facebookcard_description.cy'
import './E080-AP-update_tiers_title_general.cy'
import './E081AP-update_tiers_title_general_preview.cy'
import './E082-AP-update_tiers_long_title_general.cy'
import './E083-AP-update_tiers_long_title_preview.cy'
import './E084-AP-update_tiers_description_general.cy'
import './E085-AP-update_tiers_description_preview.cy'
import './E086-AP-update_tiers_long_description_general.cy'
import './E087-AP-update_tiers_long_description_preview.cy'
import './E088-AP-update_tiers_url_general.cy'
import './E089-AP-configure_custom_integration.cy'
import './E090-FK-modify_alphanumeric_site_name.cy'
const requireTestFiles = require.context('../settings_management', true, /\.cy\.js$/);

requireTestFiles.keys().forEach(requireTestFiles);

describe('Run All Scenarios', () => {
    // All tests in the tag_management folder will be executed
});
