# Artikel-Coach

German articles training web tool. Intended to train memorization of words articles.

Simple React SIngle Page Application that runs inside browser and keep all data locally in the browser.

Any set of words can be added as a new words set using plain text. The sample of such text:

```text
meta:id:wordset-1
meta:a:der die das
# Comment
das Mädchen
der Junge
die Butter
```

Metadata field are required:

- meta:id - name of the wordset
- meta:a - space separated posiible word articles (for other languages can be specified here)
