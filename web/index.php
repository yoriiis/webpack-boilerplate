<?php $ASSETS = json_decode(file_get_contents("./dist/manifest.json"), true); ?>
<?php //var_dump($ASSETS); ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Webpack - Boilerplate</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<meta name="description" content="" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="" />
		<meta property="og:url" content="" />
		<meta property="og:description" content="" />
		<meta property="og:image" content="" />
        <?php include $ASSETS["templates/home-styles.html"]; ?>
        <?php include $ASSETS["templates/home-scripts.html"]; ?>
	</head>
	<body>
		<div id="app"></div>
        <!--
            webpack-manifest-plugin issue with key name
            https://github.com/shellscape/webpack-manifest-plugin/issues/238
        -->
        <img src="<?php echo $ASSETS["src/home/assets/images/panda.png"]; ?>" alt="Panda" />
        <?php include $ASSETS["sprites/home.svg"]; ?>
	</body>
</html>
