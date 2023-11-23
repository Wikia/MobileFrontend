<?php

namespace MobileFrontend\Amc;

use MediaWiki\MediaWikiServices;
use MediaWiki\User\UserIdentity;
use MediaWiki\User\UserOptionsLookup;
use MediaWiki\User\UserOptionsManager;
use MobileFrontend\Features\IUserMode;
use MobileFrontend\Features\IUserSelectableMode;
use RuntimeException;

class UserMode implements IUserMode, IUserSelectableMode {

	public const USER_OPTION_MODE_AMC = 'mf_amc_optin';
	/**
	 * Value in the user options when AMC is enabled
	 */
	public const OPTION_ENABLED = '1';

	/**
	 * Value in the user options when AMC is disabled (default state)
	 */
	public const OPTION_DISABLED = '0';

	/**
	 * @var UserIdentity
	 */
	private $userIdentity;

	/**
	 * @var Manager
	 */
	private $amc;

	/**
	 * @var UserOptionsLookup
	 */
	private $userOptionsLookup;

	/**
	 * @var UserOptionsManager
	 */
	private $userOptionsManager;

	/**
	 * @param Manager $amcManager
	 * @param UserIdentity $userIdentity
	 * @param UserOptionsLookup $userOptionsLookup
	 * @param UserOptionsManager $userOptionsManager
	 * @throws \RuntimeException When AMC mode is not available
	 */
	public function __construct(
		Manager $amcManager,
		UserIdentity $userIdentity,
		UserOptionsLookup $userOptionsLookup,
		UserOptionsManager $userOptionsManager
	) {
		$this->amc = $amcManager;
		$this->userIdentity = $userIdentity;
		$this->userOptionsLookup = $userOptionsLookup;
		$this->userOptionsManager = $userOptionsManager;
	}

	/**
	 * @return string
	 */
	public function getModeIdentifier() {
		return $this->amc->getModeIdentifier();
	}

	/**
	 * Return information if the AMC mode is enabled by user
	 * @return bool
	 */
	public function isEnabled() {
		// START UGC-4299 Experiment enable AMC by default for users
		$experimentVariant = $this->amc->getAMCExperimentVariant();

		if ( $experimentVariant ) {
			return $experimentVariant === Manager::EXPERIMENT_ENABLE_AMC_VARIANT;
		}
		// END UGC-4299 Experiment enable AMC by default for users

		$userOption = $this->userOptionsLookup->getOption(
			$this->userIdentity,
			self::USER_OPTION_MODE_AMC,
			self::OPTION_DISABLED
		);
		return $this->amc->isAvailable() &&
			 $userOption === self::OPTION_ENABLED;
	}

	// START UGC-4299 Experiment enable AMC by default for users

	/**
	 * Get information if the AMC switch should be hidden for current user
	 * It's require for experiment purpose UGC-4299
	 * @return bool
	 */
	public function isAMCSwitchHidden(): bool {
		return !empty( $this->amc->getAMCExperimentVariant() );
	}

	// END UGC-4299 Experiment enable AMC by default for users

	/**
	 * Set Advanced Mobile Contributions mode to enabled or disabled.
	 *
	 * WARNING: Does not persist the updated user preference to the database.
	 * The caller must handle this by calling User::saveSettings() after all
	 * preference updates associated with this web request are made.
	 * @param bool $isEnabled
	 * @throws RuntimeException when mode is disabled
	 */
	public function setEnabled( bool $isEnabled ) {
		// START UGC-4299 Experiment enable AMC by default for users
		$experimentVariant = $this->amc->getAMCExperimentVariant();
		if ( $experimentVariant ) {
			throw new RuntimeException( 'AMC Mode is not available' );
		}
		// END UGC-4299 Experiment enable AMC by default for users

		if ( !$this->amc->isAvailable() ) {
			throw new RuntimeException( 'AMC Mode is not available' );
		}
		$this->userOptionsManager->setOption(
			$this->userIdentity,
			self::USER_OPTION_MODE_AMC,
			$isEnabled ? self::OPTION_ENABLED : self::OPTION_DISABLED
		);
	}

	/**
	 * Create UserMode for given user
	 * NamedConstructor used by hooks system
	 *
	 * @param UserIdentity $userIdentity
	 * @return self
	 */
	public static function newForUser( UserIdentity $userIdentity ) {
		$services = MediaWikiServices::getInstance();
		return new self(
			$services->getService( 'MobileFrontend.AMC.Manager' ),
			$userIdentity,
			$services->getUserOptionsLookup(),
			$services->getUserOptionsManager()
		);
	}

}
