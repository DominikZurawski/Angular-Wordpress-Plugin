<?php
/**
 * Plugin Name:         AngularWordpressApp
 * Plugin URI:          https://yourdomain/wherever-you-keep-the-app-readme-file
 * Description:         Some great app!
 * Version:             1.0.0
 * Author:              Dominik Zurawski
 * Author URI:          https://yourdomain/wherever-you-keep-the-app-readme-file
 */

function load_ng_scripts() {
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/styles-5INURTSO.css' );
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/main-JSPUI7HF.js', [], '1.0.0', true );
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/polyfills-SCHOHYNV.js', [], '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );

function attach_ng($atts) {
    wp_enqueue_script( 'ng_main' );
    wp_enqueue_script( 'ng_polyfills' );

    $atts = shortcode_atts( array(
        'component' => 'posts',
    ), $atts, 'ng_wp' );

    return "<app-root component='{$atts['component']}'></app-root>";
}

add_shortcode( 'ng_wp', 'attach_ng' );

function attach_ng_crud($atts) {
    wp_enqueue_script( 'ng_main' );
    wp_enqueue_script( 'ng_polyfills' );

    $atts = shortcode_atts( array(
        'component' => 'crud',
    ), $atts, 'ng_crud' );

    return "<app-root component='{$atts['component']}'></app-root>";
}

add_shortcode( 'ng_crud', 'attach_ng_crud' );

// Hook to create a custom table on plugin activation
register_activation_hook(__FILE__, 'create_custom_table');

function create_custom_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_table';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name tinytext NOT NULL,
        value text NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);

    // Insert sample data
    $wpdb->insert(
        $table_name,
        array(
            'name' => 'Sample Name 1',
            'value' => 'Sample Value 1'
        )
    );

    $wpdb->insert(
        $table_name,
        array(
            'name' => 'Sample Name 2',
            'value' => 'Sample Value 2'
        )
    );
}

add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/custom_table', array(
        'methods' => 'GET',
        'callback' => 'get_custom_table_data',
    ));
});

function get_custom_table_data() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_table';
    $results = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);
    return $results;
}
?>
