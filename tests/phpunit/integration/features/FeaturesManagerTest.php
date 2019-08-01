<?php

use MobileFrontend\Features\Feature;
use MobileFrontend\Features\FeaturesManager;
use MobileFrontend\Features\UserModes;

/**
 * @group MobileFrontend
 * @coversDefaultClass \MobileFrontend\Features\FeaturesManager
 * @covers ::__construct
 */
class FeaturesManagerTest extends MediaWikiTestCase {

	private function getTestMode( $modeName, $isEnabled = true ) {
		$modeMock = $this->getMock( \MobileFrontend\Features\IUserMode::class );
		$modeMock->expects( $this->any() )
			->method( 'getModeIdentifier' )
			->willReturn( $modeName );
		$modeMock->expects( $this->any() )
			->method( 'isEnabled' )
			->willReturn( $isEnabled );

		return $modeMock;
	}

	private function makeFeature( $featureId, array $availability ) {
		return new Feature( $featureId, 'test', $availability );
	}

	/**
	 * @covers ::setup
	 */
	public function testSetUpTwice() {
		$called = 0;
		$this->setTemporaryHook( 'MobileFrontendFeaturesRegistration', function () use ( &$called ){
			$called++;
		} );
		$manager = new FeaturesManager( new UserModes() );
		$manager->setup();
		$manager->setup();
		$this->assertEquals( 1, $called, 'MobileFrontendFeaturesRegistration was called only once' );
	}

	/**
	 * @covers ::registerFeature
	 * @expectedException \RuntimeException
	 */
	public function testCannotRegisterSameFeatureTwice() {
		$featureA =
			$this->makeFeature( 'featureA',
				[ 'modeA' => true, 'modeB' => true, 'modeC' => false ] );

		$userModes = new UserModes();

		$manager = new FeaturesManager( $userModes );
		$manager->registerFeature( $featureA );
		$manager->registerFeature( $featureA );
	}

	/**
	 * @covers ::getFeature
	 */
	public function testGetFeatureReturnsExactlySameObject() {
		$featureA =
			$this->makeFeature( 'featureA',
				[ 'modeA' => true, 'modeB' => true, 'modeC' => false ] );

		$userModes = new UserModes();

		$manager = new FeaturesManager( $userModes );
		$manager->registerFeature( $featureA );

		$actual = $manager->getFeature( 'featureA' );
		$this->assertEquals( $featureA, $actual );
	}

	/**
	 * @covers ::getFeature
	 * @expectedException \RuntimeException
	 */
	public function testGetFeatureThrowsExceptionWhenFeatureNotFound() {
		$userModes = new UserModes();
		$manager = new FeaturesManager( $userModes );
		$manager->getFeature( 'featureA' );
	}

	/**
	 * @covers ::registerFeature
	 * @covers ::getAvailableForMode
	 */
	public function testGetAvailableForMode() {
		$modeAMock = $this->getTestMode( 'modeA' );
		$modeBMock = $this->getTestMode( 'modeB' );
		$modeCMock = $this->getTestMode( 'modeC' );

		$featureA = $this->makeFeature( 'featureA',
			[ 'modeA' => true, 'modeB' => true, 'modeC' => false ] );
		$featureB = $this->makeFeature( 'featureB',
			[ 'modeA' => false, 'modeB' => true, 'modeC' => false ] );
		$featureC = $this->makeFeature( 'featureC',
			[ 'modeA' => false, 'modeB' => false, 'modeC' => false ] );

		$userModes = new UserModes();
		$userModes->registerMode( $modeAMock );
		$userModes->registerMode( $modeBMock );
		$userModes->registerMode( $modeCMock );

		$manager = new FeaturesManager( $userModes );
		$manager->registerFeature( $featureA );
		$manager->registerFeature( $featureB );
		$manager->registerFeature( $featureC );

		// Should return only A and B feature
		$featuresInA = $manager->getAvailableForMode( $modeAMock );
		// Should return only B feature
		$featuresInB = $manager->getAvailableForMode( $modeBMock );
		// Should return no features
		$featuresInC = $manager->getAvailableForMode( $modeCMock );

		$this->assertCount( 1, $featuresInA, 'ModeA should have only one feature available' );
		$this->assertArrayHasKey( 'featureA', $featuresInA, 'ModeA should have only FeatureA available' );
		$this->assertCount( 2, $featuresInB, 'ModeB should have two features available' );
		$this->assertArrayHasKey( 'featureA', $featuresInB, 'ModeB should have FeatureA available' );
		$this->assertArrayHasKey( 'featureB', $featuresInB, 'ModeB should have FeatureB available' );
		$this->assertEmpty( $featuresInC, 'ModeC should have no features available' );
	}

	/**
	 * @covers ::isFeatureAvailableForCurrentUser
	 */
	public function testModeDisabledSoFeatureNotAvailableForUser() {
		// There is one feature, but modeA is not enabled by user
		$modeAMock = $this->getTestMode( 'modeA', false );
		$featureA = $this->makeFeature( 'featureA', [ 'modeA' => true ] );

		$userModes = new UserModes();
		$userModes->registerMode( $modeAMock );
		$manager = new FeaturesManager( $userModes );
		$manager->registerFeature( $featureA );

		$this->assertEquals( false, $manager->isFeatureAvailableForCurrentUser( 'featureA' ) );
	}

	/**
	 * @covers ::isFeatureAvailableForCurrentUser
	 */
	public function testFeatureAvailableInTwoModesButOnlyOneEnabledByUser() {
		// There is one feature, but modeA is not enabled by user
		$modeAMock = $this->getTestMode( 'modeA', false );
		$modeBMock = $this->getTestMode( 'modeA', true );

		$featureA = $this->makeFeature( 'featureA', [ 'modeA' => true, 'modeB' => true ] );

		$userModes = new UserModes();
		$userModes->registerMode( $modeAMock );
		$userModes->registerMode( $modeBMock );
		$manager = new FeaturesManager( $userModes );
		$manager->registerFeature( $featureA );

		$this->assertEquals( true, $manager->isFeatureAvailableForCurrentUser( 'featureA' ) );
	}

	/**
	 * @covers ::getMode
	 */
	public function testGetModeUsesModesToRetrieveData() {
		$modeMock = $this->getTestMode( 'testMode' );

		$userModes = $this->getMock( \MobileFrontend\Features\UserModes::class, [ 'getMode' ],
			[], '', false );
		$userModes->expects( $this->once() )
			->method( 'getMode' )
			->with( 'testMode' )
			->willReturn( $modeMock );
		$manager = new FeaturesManager( $userModes );
		$this->assertEquals( $modeMock, $manager->getMode( 'testMode' ) );
	}
}