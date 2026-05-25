# Guide rapide GitHub Pages

Pour que les photos s'affichent sur GitHub Pages, gardez cette structure exacte dans le depot :

```text
index.html
style.css
script.js
assets/
  photo1.jpg
  photo2.jpg
  photo3.jpg
  photo4.jpg
  photo5.jpg
  photo6.jpg
  photo-anniversaire.jpg
  photographe.jpg
```

Important :
- le dossier doit s'appeler exactement `assets` en minuscules ;
- `assets` doit etre au meme niveau que `index.html` ;
- ne mettez pas les fichiers dans un sous-dossier supplementaire comme `photo/photo/assets` si `index.html` est a la racine ;
- sur GitHub, les majuscules/minuscules comptent : `Photo1.jpg` est different de `photo1.jpg`.

Le site contient aussi des images de secours en ligne. Si une image locale manque pendant le deploiement, le navigateur affichera automatiquement une version distante temporaire.
