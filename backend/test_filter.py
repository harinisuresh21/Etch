import json

cats = json.loads('["Science > Space"]')
category = 'Science'
result = any(category in c for c in cats)
print(f'category={category}, cats={cats}, result={result}')

cats2 = json.loads('[]')
result2 = any(category in c for c in cats2)
print(f'category={category}, cats={cats2}, result={result2}')

# Test with Technology
cats3 = json.loads('["Technology > Python Development"]')
category2 = 'Technology'
result3 = any(category2 in c for c in cats3)
print(f'category={category2}, cats={cats3}, result={result3}')