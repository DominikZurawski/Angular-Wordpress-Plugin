<?php
/**
 * Plugin Name:         AngularWordpressApp
 * Plugin URI:          https://yourdomain/wherever-you-keep-the-app-readme-file
 * Description:         Some great app!
 * Version:             1.0.0
 * Author:              Dominik Zurawski
 * Author URI:          https://yourdomain/wherever-you-keep-the-app-readme-file
 *
 * Be sure to rename the folder this file is in and this file to match what your plugin will be called. The names must be the same so WordPress knows where to look.
 */

function load_ng_scripts() {
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/styles-5INURTSO.css' );
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/main-NBWIWBUJ.js', [], '1.0.0', true );
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'dist/angular-wordpress-app/browser/polyfills-SCHOHYNV.js', [], '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );

function attach_ng() {
    wp_enqueue_script( 'ng_main' );
    wp_enqueue_script( 'ng_polyfills' );

    return "<app-root></app-root>";
}

add_shortcode( 'ng_wp', 'attach_ng' );

// Add the shortcode [ng_wp] to any page or post.
// The shortcode can be whatever. [ng_wp] is just an example.
?>
