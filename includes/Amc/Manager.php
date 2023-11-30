<?php

namespace MobileFrontend\Amc;

use Config;
use MobileContext;

/**
 * Advanced Mobile Contributions Manager
 *
 * @package MobileFrontend\Amc
 */
final class Manager {
	private const EXPERIMENT_COOKIE_NAME = 'experiment-enable-amc';
	public const EXPERIMENT_ENABLE_AMC_VARIANT = 'experiment-amc-enabled-variant';

	/**
	 * A config name used to enable/disable the AMC mode
	 */
	private const AMC_MODE_CONFIG_NAME = 'MFAdvancedMobileContributions';

	/**
	 * Mode identifier used in feature configs
	 */
	private const AMC_MODE_IDENTIFIER = 'amc';

	/**
	 * Change tag
	 * All edits when has AMC enabled will be tagged with AMC_EDIT_TAG
	 */
	public const AMC_EDIT_TAG = 'advanced mobile edit';

	/**
	 * MobileContext used to retrieve shouldDisplayMobileView and user information
	 *
	 * @var MobileContext
	 */
	private $mobileContext;

	/**
	 * System config
	 * @var \Config
	 */
	private $config;

	/**
	 * @param Config $config Config object
	 * @param MobileContext $mobileContext MobileFrontend context
	 */
	public function __construct( Config $config, MobileContext $mobileContext ) {
		$this->config = $config;
		$this->mobileContext = $mobileContext;
	}

	/**
	 * Returns information if the AMC mode is available for current session
	 * @return bool
	 * @throws \ConfigException
	 */
	public function isAvailable() {
		return $this->mobileContext->shouldDisplayMobileView()
			&& $this->config->get( self::AMC_MODE_CONFIG_NAME )
			&& !$this->mobileContext->getUser()->isAnon();
	}

	/**
	 * Get the mode identifier (used in configs)
	 *
	 * @return string
	 */
	public function getModeIdentifier() {
		return self::AMC_MODE_IDENTIFIER;
	}

	// START UGC-4299 Experiment enable AMC by default for users

	/**
	 * Get the UGC-4299 Experiment active variant
	 * @return string | null
	 */
	public function getAMCExperimentVariant(): string | null {
		return $this->mobileContext->getRequest()->getCookie( self::EXPERIMENT_COOKIE_NAME, '' );
	}

	// END UGC-4299 Experiment enable AMC by default for users
}
